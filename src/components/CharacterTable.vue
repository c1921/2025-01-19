<template>
  <div class="card mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="card-title mb-0">Characters</h5>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Home</th>
              <th>Workplace</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="character in characters" :key="character.id">
              <td>{{ character.id }}</td>
              <td>{{ character.name }}</td>
              <td>{{ character.age }}</td>
              <td>
                <i :class="character.gender === 'male' ? 'bi bi-gender-male' : 'bi bi-gender-female'"></i>
                {{ character.gender }}
              </td>
              <td>
                <span :class="character.employed ? 'badge bg-success' : 'badge bg-secondary'">
                  {{ character.employed ? 'Employed' : 'Available' }}
                </span>
              </td>
              <td>
                <span v-if="character.home" class="badge bg-info">
                  {{ getBuildingName(character.home) }}
                </span>
                <span v-else class="badge bg-warning">Homeless</span>
              </td>
              <td>
                <span v-if="character.workplace" class="badge bg-primary">
                  {{ getBuildingName(character.workplace) }}
                </span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character } from '../types/character'
import { type Building } from '../types/buildings'

const props = defineProps<{
  characters: Character[],
  buildings: Building[]
}>()

const getBuildingName = (buildingId: number): string => {
  const building = props.buildings.find(b => b.id === buildingId)
  return building ? building.name : 'Unknown'
}
</script>

<style scoped>
.table {
  font-size: 0.9rem;
}

.badge {
  font-weight: normal;
}
</style> 