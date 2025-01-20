import { BuildingType, type BuildingConfig } from '../types/buildings'
import { ResourceType } from '../types/resources'

export const BUILDING_CONFIGS: Record<BuildingType, BuildingConfig> = {
  [BuildingType.HOUSE]: {
    name: 'House',
    costs: [
      { type: ResourceType.WOOD, amount: 20 },
      { type: ResourceType.STONE, amount: 10 }
    ],
    constructionTime: 5000,  // 5秒
    description: 'Provides housing for your population'
  },
  [BuildingType.GATHERER]: {
    name: 'Gatherer\'s Hut',
    costs: [
      { type: ResourceType.WOOD, amount: 30 }
    ],
    constructionTime: 6000,  // 6秒
    description: 'Gathers food from the surrounding area',
    production: {
      type: ResourceType.FOOD,
      baseRate: 1
    }
  },
  [BuildingType.MINE]: {
    name: 'Mine',
    costs: [
      { type: ResourceType.WOOD, amount: 25 },
      { type: ResourceType.STONE, amount: 15 }
    ],
    constructionTime: 8000,  // 8秒
    description: 'Extracts iron ore',
    production: {
      type: ResourceType.IRON,
      baseRate: 0.8
    }
  },
  [BuildingType.FACTORY]: {
    name: 'Factory',
    costs: [
      { type: ResourceType.WOOD, amount: 40 },
      { type: ResourceType.STONE, amount: 20 },
      { type: ResourceType.IRON, amount: 10 }
    ],
    constructionTime: 10000,  // 10秒
    description: 'Produces advanced materials',
    production: {
      type: ResourceType.WOOD,
      baseRate: 0.5
    }
  }
} 