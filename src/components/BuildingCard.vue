<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title">{{ building.name }}</h5>
      <div class="mb-2">Level {{ building.level }}</div>
      <div class="mb-2">Production Rate: {{ building.productionRate.toFixed(1) }}/s</div>
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

      <!-- 建筑控制按钮 -->
      <div class="btn-group">
        <button 
          @click="$emit('upgrade')"
          class="btn btn-success btn-sm"
        >
          Upgrade
        </button>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Building } from '../types/game'

defineProps<{
  building: Building
}>()

defineEmits<{
  (e: 'upgrade'): void
  (e: 'addWorker'): void
  (e: 'removeWorker'): void
}>()
</script>

<style>
.progress-bar.no-transition {
  transition: none !important;
}

.btn-group {
  display: flex;
  gap: 4px;
}

.btn-group .btn {
  flex: 1;
}
</style> 