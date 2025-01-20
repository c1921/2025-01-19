import { ref, type Ref } from 'vue'
import { 
  type Building, 
  type ProductionBuilding,
  type ResidentialBuilding,
  BuildingType, 
  BuildingCategory, 
  BuildingCategories,
} from '../types/buildings'
import { ResourceType } from '../types/resources'
import { type Product } from '../types/products'

export function useBuildings(products: Ref<Product[]>) {
  const buildings = ref<Building[]>([])
  const buildingTypes = Object.values(BuildingType)

  const getBuildingName = (type: BuildingType): string => {
    const names = {
      [BuildingType.HOUSE]: 'House',
      [BuildingType.GATHERER]: 'Gathere\'s Hut',
      [BuildingType.MINE]: 'Mine',
      [BuildingType.FACTORY]: 'Factory'
    }
    return names[type]
  }

  const buildNewBuilding = (type: BuildingType) => {
    const baseBuilding = {
      id: buildings.value.length + 1,
      name: getBuildingName(type),
      type,
      level: 1,
    }

    if (BuildingCategories[type] === BuildingCategory.RESIDENTIAL) {
      const residentialBuilding: ResidentialBuilding = {
        ...baseBuilding,
        capacity: 5,    // 初始容纳5人
        occupied: 0
      }
      buildings.value.push(residentialBuilding)
    } else {
      const productionBuilding: ProductionBuilding = {
        ...baseBuilding,
        productionRate: 1,
        workers: 0,
        maxWorkers: 5,
        currentLabor: 0,
        producing: type === BuildingType.FACTORY ? products.value[0] : undefined
      }
      buildings.value.push(productionBuilding)
    }
  }

  const upgradeBuilding = (building: Building) => {
    building.level++
    
    if (BuildingCategories[building.type] === BuildingCategory.RESIDENTIAL) {
      const residential = building as ResidentialBuilding
      residential.capacity = 5 + Math.floor(building.level * 2)  // 每级增加2个容量
    } else {
      const production = building as ProductionBuilding
      production.productionRate = building.level * 1.5
      production.maxWorkers = 5 + Math.floor(building.level / 2)
    }
  }

  const isProductionBuilding = (building: Building): building is ProductionBuilding => {
    return BuildingCategories[building.type] === BuildingCategory.PRODUCTION
  }

  const isResidentialBuilding = (building: Building): building is ResidentialBuilding => {
    return BuildingCategories[building.type] === BuildingCategory.RESIDENTIAL
  }

  const getResourceTypeForBuilding = (buildingType: BuildingType): ResourceType | null => {
    switch (buildingType) {
      case BuildingType.GATHERER:
        return ResourceType.FOOD
      case BuildingType.MINE:
        return ResourceType.IRON
      case BuildingType.FACTORY:
        return ResourceType.WOOD
      default:
        return null
    }
  }

  return {
    buildings,
    buildingTypes,
    getBuildingName,
    buildNewBuilding,
    upgradeBuilding,
    getResourceTypeForBuilding,
    isProductionBuilding,
    isResidentialBuilding
  }
} 