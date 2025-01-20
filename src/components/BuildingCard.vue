<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ building.name }}</h5>
      <div class="mb-2">Level {{ building.level }}</div>

      <!-- 住宅建筑信息 -->
      <template v-if="isResidentialBuilding(building)">
        <div class="mb-3">
          Population: {{ building.occupied }}/{{ building.capacity }}
        </div>
      </template>

      <!-- 生产建筑信息 -->
      <template v-else-if="isProductionBuilding(building)">
        <div class="mb-2">
          <!-- 可以添加特定的建筑描述 -->
          <div v-if="building.type === BuildingType.GATHERER" class="small text-muted mb-1">
            Gathers food from the surrounding area
          </div>
          Production Rate: {{ building.productionRate.toFixed(1) }}/s
        </div>
        <div class="mb-3">
          Workers: {{ building.workers }}/{{ building.maxWorkers }}
        </div>
        
        <!-- 生产进度显示 -->
        <div v-if="building.producing" class="mb-3">
          <div>Producing: {{ building.producing.name }}</div>
          <div class="progress">
            <div 
              class="progress-bar no-transition" 
              role="progressbar" 
              :style="{ width: `${(building.currentLabor / building.producing.laborRequired) * 100}%` }"
            >
              {{ building.currentLabor.toFixed(1) }}/{{ building.producing.laborRequired }}
            </div>
          </div>
          
          <!-- 显示生产所需资源 -->
          <div class="mt-2 small">
            Required Resources:
            <div v-for="cost in building.producing.resourceCosts" :key="cost.type">
              {{ cost.type }}: {{ cost.amount }}
            </div>
          </div>
        </div>
      </template>

      <!-- 建筑控制按钮 -->
      <div class="btn-group">
        <button 
          @click="$emit('upgrade')"
          class="btn btn-success btn-sm"
        >
          Upgrade
        </button>
        
        <!-- 生产建筑的工人控制按钮 -->
        <template v-if="isProductionBuilding(building)">
          <button 
            @click="$emit('addWorker')" 
            class="btn btn-primary btn-sm"
            :disabled="building.workers >= building.maxWorkers"
          >
            Add Worker
          </button>
          <button 
            @click="$emit('removeWorker')"
            class="btn btn-warning btn-sm"
            :disabled="building.workers <= 0"
          >
            Remove Worker
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Building, BuildingType } from '../types/buildings'
import { useBuildings } from '../composables/useBuildings'
import { useProduction } from '../composables/useProduction'

const { products } = useProduction()
const { isProductionBuilding, isResidentialBuilding } = useBuildings(products)

defineProps<{
  building: Building
}>()

defineEmits<{
  (e: 'upgrade'): void
  (e: 'addWorker'): void
  (e: 'removeWorker'): void
}>()
</script>