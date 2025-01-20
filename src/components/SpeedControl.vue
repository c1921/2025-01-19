<template>
  <div class="btn-group">
    <button 
      v-for="speed in speeds" 
      :key="speed"
      class="btn btn-sm"
      :class="speed === currentSpeed ? 'btn-primary' : 'btn-outline-primary'"
      @click="$emit('speed-change', speed)"
    >
      {{ SPEED_LABELS[speed] }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { GameSpeed, SPEED_LABELS } from '../types/time'

// 创建速度数组以避免 Object.values() 的类型问题
const speeds = [
  GameSpeed.PAUSED,
  GameSpeed.NORMAL,
  GameSpeed.FAST,
  GameSpeed.VERY_FAST
]

defineProps<{
  currentSpeed: GameSpeed
}>()

defineEmits<{
  (e: 'speed-change', speed: GameSpeed): void
}>()
</script> 