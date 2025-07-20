<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3>EOB Trading Chart</h3>
      <div class="chart-controls">
        <button class="btn btn-secondary" @click="generateSampleData">EOB Demo Data</button>
        <button class="btn btn-secondary" @click="generateRandomData">Random Data</button>
        <button class="btn btn-secondary" @click="generateTrendingData">Trending Data</button>
        <button class="btn btn-primary" @click="detectEOBs">Detect EOBs</button>
      </div>
    </div>
    
    <div class="chart-wrapper">
      <canvas ref="chartCanvas" width="800" height="400"></canvas>
    </div>
    
    <div class="eob-info" v-if="detectedEOBs.length > 0">
      <h4>Detected EOBs ({{ detectedEOBs.length }})</h4>
      <div class="eob-list">
        <div 
          v-for="(eob, index) in detectedEOBs" 
          :key="index"
          class="eob-item"
          :class="eob.type"
        >
          <span class="eob-type">{{ eob.type.toUpperCase() }}</span>
          <span class="eob-timeframe">{{ eob.timeframe }}</span>
          <span class="eob-zone">Zone: {{ eob.zone.low.toFixed(2) }} - {{ eob.zone.high.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useEOBStore } from '../stores/eobStore'
import Chart from 'chart.js/auto'
import { createChartConfig, createEOBAnnotations } from '../utils/chartConfig'
import { generateEOBDemoData, generateRandomData, generateTrendingData } from '../utils/demoData'

const store = useEOBStore()
const chartCanvas = ref(null)
const chart = ref(null)
const detectedEOBs = ref([])
const sampleData = ref([])

// Generate sample candlestick data
const generateSampleData = () => {
  // Use the EOB demo data that contains actual EOB patterns
  sampleData.value = generateEOBDemoData()
  updateChart()
}

// Update chart with current data and EOBs
const updateChart = () => {
  if (!chartCanvas.value || sampleData.value.length === 0) return
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chart.value) {
    chart.value.destroy()
  }
  
  // Create candlestick data
  const candlestickData = sampleData.value.map((candle, index) => ({
    x: index,
    o: candle.open,
    h: candle.high,
    l: candle.low,
    c: candle.close
  }))
  
  // Create chart configuration
  const config = createChartConfig(candlestickData, detectedEOBs.value, store.colors, store.ltfVisibility)
  
  // Add EOB annotations if any detected
  if (detectedEOBs.value.length > 0) {
    const annotations = createEOBAnnotations(detectedEOBs.value, store.colors, store.ltfVisibility)
    config.options.plugins.annotation = {
      annotations: annotations
    }
  }
  
  chart.value = new Chart(ctx, config)
}

// Generate different types of data
const generateRandomData = () => {
  sampleData.value = generateRandomData(50)
  updateChart()
}

const generateTrendingData = () => {
  sampleData.value = generateTrendingData()
  updateChart()
}

// Detect EOBs in the sample data
const detectEOBs = () => {
  if (sampleData.value.length === 0) {
    generateSampleData()
  }
  
  const eobs = store.detectAllEOBs(sampleData.value, '1h')
  detectedEOBs.value = eobs
  updateChart()
}

// Watch for store changes and update chart
watch(() => store.colors, updateChart, { deep: true })
watch(() => store.ltfVisibility, updateChart, { deep: true })

onMounted(() => {
  generateSampleData()
})
</script>

<style scoped>
.chart-container {
  background: var(--chart-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  color: var(--accent-color);
  margin: 0;
}

.chart-controls {
  display: flex;
  gap: 10px;
}

.chart-wrapper {
  height: 400px;
  margin-bottom: 20px;
  position: relative;
}

.chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
}

.eob-info {
  background: var(--accent-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 15px;
}

.eob-info h4 {
  color: var(--accent-color);
  margin-bottom: 10px;
}

.eob-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.eob-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.eob-item.bullish {
  background: rgba(0, 212, 170, 0.2);
  border: 1px solid var(--success-color);
}

.eob-item.bearish {
  background: rgba(255, 71, 87, 0.2);
  border: 1px solid var(--danger-color);
}

.eob-type {
  font-weight: 600;
  text-transform: uppercase;
}

.eob-timeframe {
  color: var(--secondary-text);
}

.eob-zone {
  color: var(--secondary-text);
}

@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .chart-controls {
    width: 100%;
  }
  
  .eob-list {
    flex-direction: column;
  }
}
</style>