import { ref, type Ref } from 'vue'
import { type Population, type Resource, ResourceType } from '../types/game'

export function usePopulation(resources: Ref<Resource[]>) {
  const population = ref<Population>({
    total: 10,
    employed: 0,
    available: 10,
    growth: 0.1,
    foodConsumption: 0.1
  })

  const updatePopulation = (tickRate: number) => {
    const food = resources.value.find((r: Resource) => r.type === ResourceType.FOOD)
    if (food && food.amount > population.value.foodConsumption * population.value.total) {
      const growth = (population.value.growth / 60) * (tickRate / 1000)
      population.value.total += growth
      population.value.available += growth
    }
  }

  return {
    population,
    updatePopulation
  }
} 