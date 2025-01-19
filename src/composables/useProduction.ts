import { ref } from 'vue'
import { type Product, ProductType, ResourceType } from '../types/game'

export function useProduction() {
  const products = ref<Product[]>([
    {
      id: 1,
      name: 'Iron Tools',
      type: ProductType.IRON_TOOLS,
      laborRequired: 10,
      resourceCosts: [
        { type: ResourceType.IRON, amount: 5 }
      ]
    }
  ])

  const TICK_RATE = 10
  const LABOR_PER_SECOND = 1

  return {
    products,
    TICK_RATE,
    LABOR_PER_SECOND
  }
} 