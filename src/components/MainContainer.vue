<template>
  <div class="container py-4">
    <!-- 添加时间显示 -->
    <div class="mb-4">
      <h3 class="text-center">{{ gameTime.date }}</h3>
    </div>
    <div class="row">
      <!-- 左侧建筑区域 -->
      <div class="col-md-8">
        <CharacterTable 
          :characters="population.characters"
          :buildings="buildings"
        />
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Buildings</h5>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <div class="btn-group">
                <button 
                  v-for="type in buildingTypes" 
                  :key="type"
                  @click="onBuildNewBuilding(type)"
                  class="btn btn-primary"
                >
                  Build {{ getBuildingName(type) }}
                </button>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-md-6" v-for="building in buildings" :key="building.id">
                <BuildingCard 
                  :building="building"
                  @add-worker="addWorker(building)"
                  @remove-worker="removeWorker(building)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧信息面板 -->
      <div class="col-md-4">
        <PopulationPanel 
          :population="population" 
          :buildings="buildings"
        />
        <ResourcesPanel :resources="resources" />
        <LogPanel 
          :logs="logs" 
          @clear="clearLogs"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import PopulationPanel from './PopulationPanel.vue'
import ResourcesPanel from './ResourcesPanel.vue'
import BuildingCard from './BuildingCard.vue'
import CharacterTable from './CharacterTable.vue'
import { useResources } from '../composables/useResources'
import { usePopulation } from '../composables/usePopulation'
import { useProduction } from '../composables/useProduction'
import { useBuildings } from '../composables/useBuildings'
import { type Building, BuildingType } from '../types/buildings'
import { useLogs } from '../composables/useLogs'
import { LogType } from '../types/logs'
import LogPanel from './LogPanel.vue'
import { useGameLoop } from '../composables/useGameLoop'
import { useGameTime } from '../composables/useGameTime'

const { resources, updateResource } = useResources()
const { products, TICK_RATE, LABOR_PER_SECOND } = useProduction()
const { 
  buildings, 
  buildingTypes, 
  getBuildingName, 
  buildNewBuilding, 
  getResourceTypeForBuilding,
  isProductionBuilding,
  updateConstructionProgress
} = useBuildings(products)
const { population, updatePopulation } = usePopulation(resources, buildings)
const { logs, addLog, clearLogs } = useLogs()
const { gameTime, updateGameTime } = useGameTime(addLog)

const { startGameLoop, stopGameLoop } = useGameLoop({
  buildings,
  resources,
  population,
  TICK_RATE,
  LABOR_PER_SECOND,
  isProductionBuilding,
  getResourceTypeForBuilding,
  updateResource,
  updatePopulation,
  updateConstructionProgress,
  updateGameTime
})

const addWorker = (building: Building) => {
  if (isProductionBuilding(building) && 
      population.value.available > 0 && 
      building.workers < building.maxWorkers) {
    const availableCharacter = population.value.characters.find(
      char => !char.employed
    )
    
    if (availableCharacter) {
      building.workers++
      population.value.employed++
      population.value.available--
      availableCharacter.employed = true
      availableCharacter.workplace = building.id
      
      addLog(LogType.CHARACTER, 
        `${availableCharacter.name} started working at ${building.name}`)
    }
  }
}

const removeWorker = (building: Building) => {
  if (isProductionBuilding(building) && building.workers > 0) {
    // 找到在这个建筑工作的角色
    const workingCharacter = population.value.characters.find(
      char => char.workplace === building.id
    )
    
    if (workingCharacter) {
      building.workers--
      population.value.employed--
      population.value.available++
      
      // 更新角色状态
      workingCharacter.employed = false
      workingCharacter.workplace = undefined
    }
  }
}

onMounted(() => {
  startGameLoop()
})

onUnmounted(() => {
  stopGameLoop()
})

const onBuildNewBuilding = (type: BuildingType) => {
  if (buildNewBuilding(type, resources.value, updateResource)) {
    addLog(LogType.BUILDING, `Started construction of ${getBuildingName(type)}`)
  } else {
    addLog(LogType.SYSTEM, `Cannot afford to build ${getBuildingName(type)}`, true)
  }
}
</script>