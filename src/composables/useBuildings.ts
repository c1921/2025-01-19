import { ref, type Ref } from 'vue'
import { type Building, type Product, BuildingType, ResourceType } from '../types/game'

export function useBuildings(products: Ref<Product[]>) {
  const buildings = ref<Building[]>([])
  const buildingTypes = Object.values(BuildingType)

  const getBuildingName = (type: BuildingType): string => {
    const names = {
      [BuildingType.HOUSE]: 'House',
      [BuildingType.FARM]: 'Farm',
      [BuildingType.MINE]: 'Mine',
      [BuildingType.FACTORY]: 'Factory'
    }
    return names[type]
  }

  const buildNewBuilding = (type: BuildingType) => {
    const building: Building = {
      id: buildings.value.length + 1,
      name: getBuildingName(type),
      type,
      level: 1,
      productionRate: 1,
      workers: 0,
      maxWorkers: 5,
      currentLabor: 0,
      producing: type === BuildingType.FACTORY ? products.value[0] : undefined
    }
    buildings.value.push(building)
  }

  const upgradeBuilding = (building: Building) => {
    building.level++
    building.productionRate = building.level * 1.5
    building.maxWorkers = 5 + Math.floor(building.level / 2)
  }

  const getResourceTypeForBuilding = (buildingType: BuildingType): ResourceType | null => {
    switch (buildingType) {
      case BuildingType.FARM:
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
    getResourceTypeForBuilding
  }
} 