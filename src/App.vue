<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <h1>EOB Trading Indicator</h1>
        <p>Advanced End of Block (EOB) Detection System</p>
      </div>
    </header>
    
    <main class="app-main">
      <div class="container">
        <div class="grid-2">
          <div class="settings-panel">
            <EOBSettings />
          </div>
          <div class="chart-panel">
            <ChartDisplay />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import EOBSettings from './components/EOBSettings.vue'
import ChartDisplay from './components/ChartDisplay.vue'
</script>

<style scoped>
.app-header {
  background: var(--secondary-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 20px 0;
  margin-bottom: 30px;
}

.app-header h1 {
  color: var(--accent-color);
  margin-bottom: 5px;
  font-size: 28px;
  font-weight: 700;
}

.app-header p {
  color: var(--secondary-text);
  margin: 0;
  font-size: 16px;
}

.app-main {
  min-height: calc(100vh - 120px);
}

.settings-panel {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  height: fit-content;
  max-height: 80vh;
  overflow-y: auto;
}

.chart-panel {
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
}

@media (max-width: 1200px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .settings-panel {
    max-height: none;
  }
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 24px;
  }
  
  .app-header p {
    font-size: 14px;
  }
  
  .settings-panel,
  .chart-panel {
    padding: 15px;
  }
}
</style>