<template>
  <div class="card mb-4">
    <div class="card-header">
      <h5 class="card-title mb-0">Population</h5>
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md">
          <div class="d-flex justify-content-between">
            <span>Total Population:</span>
            <span>{{ Math.floor(population.total) }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Available Workers:</span>
            <span>{{ Math.floor(population.available) }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Employed:</span>
            <span>{{ Math.floor(population.employed) }}</span>
          </div>
          <div class="d-flex justify-content-between">
            <span>Homeless:</span>
            <span :class="{ 'text-danger': homeless > 0 }">{{ homeless }}</span>
          </div>
        </div>
        <!-- ... other population stats ... -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Population, type Building } from '../types/game'
import { useBuildings } from '../composables/useBuildings'
import { useProduction } from '../composables/useProduction'

const props = defineProps<{
  population: Population,
  buildings: Building[]
}>()

const { products } = useProduction()
const { isResidentialBuilding } = useBuildings(products)

// 计算无家可归人数
const homeless = computed(() => {
  const totalHousing = props.buildings
    .filter(isResidentialBuilding)
    .reduce((sum, building) => {
      if (isResidentialBuilding(building)) {
        return sum + building.capacity
      }
      return sum
    }, 0)
  
  return Math.max(0, Math.floor(props.population.total - totalHousing))
})
</script> 