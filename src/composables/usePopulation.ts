import { ref, type Ref } from 'vue'
import { type Population } from '../types/population'
import { type Resource, ResourceType } from '../types/resources'
import { type Building } from '../types/buildings'
import { useBuildings } from './useBuildings'
import { type Character, generateCharacter } from '../types/character'

export function usePopulation(resources: Ref<Resource[]>, buildings: Ref<Building[]>) {
  const population = ref<Population>({
    total: 10,        // 总人口
    employed: 0,      // 已雇佣工人
    available: 10,    // 可用工人
    growth: 0,        // 移除增长率
    foodConsumption: 0.1,  // 每人每秒食物消耗
    characters: Array.from({ length: 10 }, (_, i) => generateCharacter(i + 1))  // 初始10个角色
  })

  const { isResidentialBuilding } = useBuildings(ref([]))

  // 分配住房 - 尽可能多地安置人口，但不限制总人口
  const assignHousing = () => {
    // 获取所有住宅建筑
    const residentialBuildings = buildings.value.filter(isResidentialBuilding)
    
    // 先清空所有住宅的入住人数和角色的住房信息
    residentialBuildings.forEach(building => {
      if (isResidentialBuilding(building)) {
        building.occupied = 0
      }
    })
    population.value.characters.forEach(character => {
      character.home = undefined
    })

    // 尽可能分配人口到住宅
    let remainingPopulation = population.value.total
    let characterIndex = 0
    residentialBuildings.forEach(building => {
      if (isResidentialBuilding(building)) {
        const toAssign = Math.min(remainingPopulation, building.capacity)
        building.occupied = toAssign
        
        // 为角色分配住房
        for (let i = 0; i < toAssign && characterIndex < population.value.characters.length; i++) {
          population.value.characters[characterIndex].home = building.id
          characterIndex++
        }
        
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

  // 添加角色管理函数
  const addCharacter = () => {
    const newCharacter = generateCharacter(population.value.characters.length + 1)
    population.value.characters.push(newCharacter)
    population.value.total++
    population.value.available++
  }

  const removeCharacter = (character: Character) => {
    const index = population.value.characters.findIndex(c => c.id === character.id)
    if (index !== -1) {
      if (character.employed) {
        population.value.employed--
        population.value.available++
      }
      population.value.characters.splice(index, 1)
      population.value.total--
    }
  }

  return {
    population,
    updatePopulation,
    assignHousing,
    addCharacter,
    removeCharacter
  }
} 