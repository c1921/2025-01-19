<template>
  <div class="card mb-4">
    <div class="card-header">
      <h5 class="card-title mb-0">Resources</h5>
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-3" v-for="resource in resources" :key="resource.id">
          <div class="d-flex justify-content-between">
            <span>{{ resource.name }}:</span>
            <span>{{ resource.amount.toFixed(1) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/// <reference types="../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import type { Resource } from '../types/game';

defineProps<{
  resources: Resource[]
}>()
</script> 