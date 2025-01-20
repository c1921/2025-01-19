<template>
  <div class="card mb-4">
    <div class="card-header">
      <h5 class="card-title mb-0">Resources</h5>
    </div>
    <div class="card-body">
      <ul class="list-group">
        <li 
          v-for="resource in resources" 
          :key="resource.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ resource.name }}
          <span class="badge bg-primary rounded-pill">
            {{ resource.amount.toFixed(1) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import type { Resource } from '../types/resources';

defineProps<{
  resources: Resource[]
}>()
</script> 