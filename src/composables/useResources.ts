import { ref } from 'vue'
import { type Resource, ResourceType } from '../types/game'

export function useResources() {
  const resources = ref<Resource[]>([
    { id: 1, name: 'Wood', type: ResourceType.WOOD, amount: 100 },
    { id: 2, name: 'Stone', type: ResourceType.STONE, amount: 100 },
    { id: 3, name: 'Food', type: ResourceType.FOOD, amount: 100 },
    { id: 4, name: 'Iron', type: ResourceType.IRON, amount: 100 },
    { id: 5, name: 'Iron Tools', type: ResourceType.IRON_TOOLS, amount: 0 }
  ])

  const updateResource = (type: ResourceType, amount: number) => {
    const resource = resources.value.find(r => r.type === type)
    if (resource) {
      resource.amount += amount
    }
  }

  return {
    resources,
    updateResource
  }
} 