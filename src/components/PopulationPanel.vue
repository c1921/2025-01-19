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
            <span>{{ population.total.toFixed(1) }}</span>
          </div>
        </div>
        <!-- ... other population stats ... -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Population } from '../types/game'

defineProps<{
  population: Population
}>()
</script> 