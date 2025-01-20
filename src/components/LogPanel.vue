<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0">Event Log</h5>
      <button class="btn btn-sm btn-outline-secondary" @click="clearLogs">
        Clear
      </button>
    </div>
    <div class="card-body p-0">
      <div class="log-container">
        <div 
          v-for="log in props.logs" 
          :key="log.id"
          class="log-entry p-2"
          :class="{
            'border-bottom': true,
            'bg-light': log.important,
            [`text-${getTypeColor(log.type)}`]: true
          }"
        >
          <small class="text-muted">
            {{ new Date(log.timestamp).toLocaleTimeString() }}
          </small>
          <span class="ms-2">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type LogEntry, LogType } from '../types/logs'

const props = defineProps<{
  logs: LogEntry[]
}>()

const emit = defineEmits<{
  (e: 'clear'): void
}>()

const getTypeColor = (type: LogType): string => {
  switch (type) {
    case LogType.BUILDING: return 'primary'
    case LogType.CHARACTER: return 'success'
    case LogType.RESOURCE: return 'warning'
    case LogType.SYSTEM: return 'danger'
    default: return 'secondary'
  }
}

const clearLogs = () => {
  emit('clear')
}
</script>
