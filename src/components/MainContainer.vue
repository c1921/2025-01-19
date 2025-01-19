<template>
  <div class="container py-4">
    <PopulationPanel :population="population" />
    <ResourcesPanel :resources="resources" />
    
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
              @click="buildNewBuilding(type)"
              class="btn btn-primary"
            >
              Build {{ getBuildingName(type) }}
            </button>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-4" v-for="building in buildings" :key="building.id">
            <BuildingCard 
              :building="building"
              @upgrade="upgradeBuilding(building)"
              @add-worker="addWorker(building)"
              @remove-worker="removeWorker(building)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import PopulationPanel from './PopulationPanel.vue'
import ResourcesPanel from './ResourcesPanel.vue'
import BuildingCard from './BuildingCard.vue'
import { useResources } from '../composables/useResources'
import { usePopulation } from '../composables/usePopulation'
import { useProduction } from '../composables/useProduction'
import { useBuildings } from '../composables/useBuildings'
import { type Building, ResourceType } from '../types/game'

const { resources, updateResource } = useResources()
const { population, updatePopulation } = usePopulation(resources)
const { products, TICK_RATE, LABOR_PER_SECOND } = useProduction()
const { 
  buildings, 
  buildingTypes, 
  getBuildingName, 
  buildNewBuilding, 
  upgradeBuilding,
  getResourceTypeForBuilding 
} = useBuildings(products)

const addWorker = (building: Building) => {
  if (population.value.available > 0 && building.workers < building.maxWorkers) {
    building.workers++
    population.value.employed++
    population.value.available--
  }
}

const removeWorker = (building: Building) => {
  if (building.workers > 0) {
    building.workers--
    population.value.employed--
    population.value.available++
  }
}

const produceResources = () => {
  buildings.value.forEach(building => {
    // 基础资源生产（矿场、农场等）
    const resourceType = getResourceTypeForBuilding(building.type)
    if (resourceType) {
      const resource = resources.value.find(r => r.type === resourceType)
      if (resource) {
        const production = building.productionRate * (building.workers / building.maxWorkers) * (TICK_RATE / 1000)
        resource.amount += production
      }
    }
    
    // 产品生产（工厂等）
    if (building.producing) {
      const laborPerTick = (building.workers * LABOR_PER_SECOND * building.level) * (TICK_RATE / 1000)
      building.currentLabor += laborPerTick
      
      if (building.currentLabor >= building.producing.laborRequired) {
        const canProduce = building.producing.resourceCosts.every(cost => {
          const resource = resources.value.find(r => r.type === cost.type)
          return resource && resource.amount >= cost.amount
        })
        
        if (canProduce) {
          // 消耗资源
          building.producing.resourceCosts.forEach(cost => {
            updateResource(cost.type, -cost.amount)
          })
          
          // 重置劳动点数
          building.currentLabor -= building.producing.laborRequired
          
          // 添加产品到库存
          updateResource(ResourceType.IRON_TOOLS, 1)  // 使用 ResourceType 而不是 ProductType
        }
      }
    }
  })

  // 人口消耗食物（也需要按tick rate调整）
  const food = resources.value.find(r => r.type === ResourceType.FOOD)
  if (food) {
    food.amount -= population.value.foodConsumption * population.value.total * (TICK_RATE / 1000)
  }
}

let productionInterval: number
let populationInterval: number

onMounted(() => {
  productionInterval = setInterval(produceResources, TICK_RATE)
  populationInterval = setInterval(() => updatePopulation(TICK_RATE), TICK_RATE)
})

onUnmounted(() => {
  clearInterval(productionInterval)
  clearInterval(populationInterval)
})
</script>

<style>
.progress-bar.no-transition {
  transition: none !important;
}
</style>