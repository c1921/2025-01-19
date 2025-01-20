import { ref, type Ref } from 'vue'
import { type Population, type Resource, type Building, ResourceType } from '../types/game'
import { useBuildings } from './useBuildings'

export function usePopulation(resources: Ref<Resource[]>, buildings: Ref<Building[]>) {
  const population = ref<Population>({
    total: 10,        // 总人口
    employed: 0,      // 已雇佣工人
    available: 10,    // 可用工人
    growth: 0,        // 移除增长率
    foodConsumption: 0.1  // 每人每秒食物消耗
  })

  const { isResidentialBuilding } = useBuildings(ref([]))

  // 分配住房 - 尽可能多地安置人口，但不限制总人口
  const assignHousing = () => {
    // 获取所有住宅建筑
    const residentialBuildings = buildings.value.filter(isResidentialBuilding)
    
    // 先清空所有住宅的入住人数
    residentialBuildings.forEach(building => {
      if (isResidentialBuilding(building)) {
        building.occupied = 0
      }
    })

    // 尽可能分配人口到住宅
    let remainingPopulation = population.value.total
    residentialBuildings.forEach(building => {
      if (isResidentialBuilding(building)) {
        const toAssign = Math.min(remainingPopulation, building.capacity)
        building.occupied = toAssign
        remainingPopulation -= toAssign
      }
    })
  }

  const updatePopulation = () => {
    const food = resources.value.find((r: Resource) => r.type === ResourceType.FOOD)
    if (food && food.amount <= 0) {
      console.log('No food available!')
    }
    assignHousing() // 每次更新时重新分配住房
  }

  return {
    population,
    updatePopulation,
    assignHousing
  }
} 