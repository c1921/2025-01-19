import { ref, type Ref } from 'vue'
import { 
  type Building, 
  type ProductionBuilding,
  type ResidentialBuilding,
  BuildingType, 
  BuildingCategory, 
  BuildingCategories,
  type BuildingCost,
  BuildingStatus
} from '../types/buildings'
import { ResourceType, type Product, type Resource } from '../types/resources'
import { BUILDING_CONFIGS } from '../configs/buildings'

export function useBuildings(products: Ref<Product[]>) {
  const buildings = ref<Building[]>([])
  const buildingTypes = Object.values(BuildingType)

  const getBuildingName = (type: BuildingType): string => {
    return BUILDING_CONFIGS[type].name
  }

  const getBuildingCosts = (type: BuildingType): BuildingCost[] => {
    return BUILDING_CONFIGS[type].costs
  }

  const canBuildBuilding = (type: BuildingType, resources: Resource[]): boolean => {
    return BUILDING_CONFIGS[type].costs.every(cost => {
      const resource = resources.find(r => r.type === cost.type)
      return resource && resource.amount >= cost.amount
    })
  }

  const buildNewBuilding = (type: BuildingType, resources: Resource[], updateResource: (type: ResourceType, amount: number) => void) => {
    if (!canBuildBuilding(type, resources)) {
      return false
    }

    const baseBuilding = {
      id: buildings.value.length + 1,
      name: getBuildingName(type),
      type,
      costs: BUILDING_CONFIGS[type].costs,
      status: BuildingStatus.UNDER_CONSTRUCTION,
      constructionProgress: 0,
      constructionTime: BUILDING_CONFIGS[type].constructionTime
    }

    // 扣除资源
    BUILDING_CONFIGS[type].costs.forEach(cost => {
      updateResource(cost.type, -cost.amount)
    })

    if (BuildingCategories[type] === BuildingCategory.RESIDENTIAL) {
      const residentialBuilding: ResidentialBuilding = {
        ...baseBuilding,
        capacity: 0,    // 建造完成前没有容量
        occupied: 0
      }
      buildings.value.push(residentialBuilding)
    } else {
      const productionBuilding: ProductionBuilding = {
        ...baseBuilding,
        productionRate: 0,  // 建造完成前不生产
        workers: 0,
        maxWorkers: 0,
        currentLabor: 0,
        producing: type === BuildingType.FACTORY ? products.value[0] : undefined
      }
      buildings.value.push(productionBuilding)
    }
    return true
  }

  const isProductionBuilding = (building: Building): building is ProductionBuilding => {
    return BuildingCategories[building.type] === BuildingCategory.PRODUCTION
  }

  const isResidentialBuilding = (building: Building): building is ResidentialBuilding => {
    return BuildingCategories[building.type] === BuildingCategory.RESIDENTIAL
  }

  const getResourceTypeForBuilding = (buildingType: BuildingType): ResourceType | null => {
    return BUILDING_CONFIGS[buildingType].production?.type ?? null
  }

  // 更新建造进度
  const updateConstructionProgress = (tickRate: number) => {
    buildings.value.forEach(building => {
      if (building.status === BuildingStatus.UNDER_CONSTRUCTION) {
        building.constructionProgress! += (tickRate / building.constructionTime!) * 100

        if (building.constructionProgress! >= 100) {
          building.status = BuildingStatus.COMPLETED
          building.constructionProgress = undefined
          building.constructionTime = undefined

          // 设置完成后的初始属性
          if (BuildingCategories[building.type] === BuildingCategory.RESIDENTIAL) {
            const residential = building as ResidentialBuilding
            residential.capacity = 5
          } else {
            const production = building as ProductionBuilding
            production.productionRate = BUILDING_CONFIGS[building.type].production?.baseRate ?? 0
            production.maxWorkers = 5
          }
        }
      }
    })
  }

  return {
    buildings,
    buildingTypes,
    getBuildingName,
    buildNewBuilding,
    getResourceTypeForBuilding,
    isProductionBuilding,
    isResidentialBuilding,
    getBuildingCosts,
    canBuildBuilding,
    updateConstructionProgress
  }
} 