import { type Ref } from 'vue'
import { 
  type Building, 
  type ProductionBuilding,
  BuildingType,
  BuildingStatus 
} from '../types/buildings'
import { type Resource, ResourceType, type ResourceCost } from '../types/resources'
import { type Population } from '../types/population'

interface GameLoopDependencies {
  buildings: Ref<Building[]>
  resources: Ref<Resource[]>
  population: Ref<Population>
  TICK_RATE: number
  LABOR_PER_SECOND: number
  isProductionBuilding: (building: Building) => building is ProductionBuilding
  getResourceTypeForBuilding: (type: BuildingType) => ResourceType | null
  updateResource: (type: ResourceType, amount: number) => void
  updatePopulation: () => void
  updateConstructionProgress: (tickRate: number) => void
  updateGameTime: (tickRate: number) => void
}

export function useGameLoop({
  buildings,
  resources,
  population,
  TICK_RATE,
  LABOR_PER_SECOND,
  isProductionBuilding,
  getResourceTypeForBuilding,
  updateResource,
  updatePopulation,
  updateConstructionProgress,
  updateGameTime
}: GameLoopDependencies) {
  
  const produceResources = () => {
    buildings.value.forEach((building: Building) => {
      if (isProductionBuilding(building) && building.status === BuildingStatus.COMPLETED) {
        // 基础资源生产
        const resourceType = getResourceTypeForBuilding(building.type)
        if (resourceType) {
          const resource = resources.value.find((r: Resource) => r.type === resourceType)
          if (resource) {
            const workerRatio = building.maxWorkers > 0 ? building.workers / building.maxWorkers : 0
            const production = building.productionRate * workerRatio * (TICK_RATE / 1000)
            resource.amount += production
          }
        }
        
        // 产品生产
        if (building.producing) {
          const laborPerTick = (building.workers * LABOR_PER_SECOND) * (TICK_RATE / 1000)
          building.currentLabor += laborPerTick
          
          if (building.currentLabor >= building.producing.laborRequired) {
            const canProduce = building.producing.resourceCosts.every((cost: ResourceCost) => {
              const resource = resources.value.find(r => r.type === cost.type)
              return resource && resource.amount >= cost.amount
            })
            
            if (canProduce) {
              // 消耗资源
              building.producing.resourceCosts.forEach((cost: ResourceCost) => {
                updateResource(cost.type, -cost.amount)
              })
              
              // 重置劳动点数
              building.currentLabor -= building.producing.laborRequired
              
              // 添加产品到库存
              updateResource(ResourceType.IRON_TOOLS, 1)
            }
          }
        }
      }
    })

    // 人口消耗食物
    const food = resources.value.find((r: Resource) => r.type === ResourceType.FOOD)
    if (food) {
      food.amount -= population.value.foodConsumption * population.value.total * (TICK_RATE / 1000)
    }
  }

  let productionInterval: number
  let populationInterval: number

  const startGameLoop = () => {
    productionInterval = setInterval(produceResources, TICK_RATE)
    populationInterval = setInterval(() => {
      updatePopulation()
      updateConstructionProgress(TICK_RATE)
      updateGameTime(TICK_RATE)
    }, TICK_RATE)
  }

  const stopGameLoop = () => {
    clearInterval(productionInterval)
    clearInterval(populationInterval)
  }

  return {
    startGameLoop,
    stopGameLoop
  }
} 