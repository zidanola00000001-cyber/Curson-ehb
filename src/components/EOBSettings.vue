<template>
  <div class="eob-settings">
    <!-- Wick and Body Settings -->
    <div class="panel">
      <div class="panel-header">Wick & Body Settings</div>
      <div class="toggle-group">
        <div 
          class="toggle-item" 
          :class="{ active: store.wickClose }"
          @click="store.toggleWickClose()"
        >
          <input 
            type="checkbox" 
            :checked="store.wickClose"
            @change="store.toggleWickClose()"
          >
          <span>Wick Close</span>
        </div>
        <div 
          class="toggle-item" 
          :class="{ active: store.bodyClose }"
          @click="store.toggleBodyClose()"
        >
          <input 
            type="checkbox" 
            :checked="store.bodyClose"
            @change="store.toggleBodyClose()"
          >
          <span>Body Close</span>
        </div>
      </div>
    </div>

    <!-- Timeframe Visibility Settings -->
    <div class="panel">
      <div class="panel-header">Timeframe EOB Visibility</div>
      <div class="timeframe-section">
        <div class="timeframe-group">
          <div class="timeframe-header">Higher Timeframes (HTF)</div>
          <div class="visibility-options">
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['1w'].enabled"
                @change="store.toggleTimeframe('1w')"
              >
              <span>Show 1 Week EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['1d'].enabled"
                @change="store.toggleTimeframe('1d')"
              >
              <span>Show 1 Day EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['4h'].enabled"
                @change="store.toggleTimeframe('4h')"
              >
              <span>Show 4 Hour EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['2h'].enabled"
                @change="store.toggleTimeframe('2h')"
              >
              <span>Show 2 Hour EOB</span>
            </div>
          </div>
        </div>

        <div class="timeframe-group">
          <div class="timeframe-header">Lower Timeframes (LTF)</div>
          <div class="visibility-options">
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['1h'].enabled"
                @change="store.toggleTimeframe('1h')"
              >
              <span>Show 1 Hour EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['30m'].enabled"
                @change="store.toggleTimeframe('30m')"
              >
              <span>Show 30 Minutes EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['15m'].enabled"
                @change="store.toggleTimeframe('15m')"
              >
              <span>Show 15 Minutes EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['5m'].enabled"
                @change="store.toggleTimeframe('5m')"
              >
              <span>Show 5 Minutes EOB</span>
            </div>
            <div class="visibility-option">
              <input 
                type="checkbox" 
                :checked="store.timeframes['3m'].enabled"
                @change="store.toggleTimeframe('3m')"
              >
              <span>Show 3 Minutes EOB</span>
            </div>
          </div>
        </div>
      </div>

      <!-- HTF Saved/Marked EOBs -->
      <div class="toggle-group">
        <div 
          class="toggle-item" 
          :class="{ active: store.showHTFSavedEOBs }"
          @click="store.toggleHTFSavedEOBs()"
        >
          <input 
            type="checkbox" 
            :checked="store.showHTFSavedEOBs"
            @change="store.toggleHTFSavedEOBs()"
          >
          <span>Show HTF Saved/Marked EOBs in Lower Timeframes</span>
        </div>
      </div>
    </div>

    <!-- LTF EOBs Visibility Settings -->
    <div class="panel">
      <div class="panel-header">LTF EOBs Visibility (1h Chart Only)</div>
      
      <div class="toggle-group">
        <div 
          class="toggle-item" 
          :class="{ active: store.ltfVisibility.enabled }"
          @click="store.toggleLTFVisibility()"
        >
          <input 
            type="checkbox" 
            :checked="store.ltfVisibility.enabled"
            @change="store.toggleLTFVisibility()"
          >
          <span>Enable LTF EOBs Visibility</span>
        </div>
      </div>

      <div v-if="store.ltfVisibility.enabled" class="grid-2">
        <div>
          <!-- Width Setting -->
          <div class="slider-group">
            <label>Width:</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              :value="store.ltfVisibility.width"
              @input="store.updateLTFWidth(parseInt($event.target.value))"
            >
            <span>{{ store.ltfVisibility.width }}px</span>
          </div>

          <!-- EQ Settings -->
          <div class="toggle-group">
            <div 
              class="toggle-item" 
              :class="{ active: store.ltfVisibility.showEQ }"
              @click="store.toggleLTFSetting('showEQ')"
            >
              <input 
                type="checkbox" 
                :checked="store.ltfVisibility.showEQ"
                @change="store.toggleLTFSetting('showEQ')"
              >
              <span>Show EQ</span>
            </div>
            <div 
              class="toggle-item" 
              :class="{ active: store.ltfVisibility.showExtended }"
              @click="store.toggleLTFSetting('showExtended')"
            >
              <input 
                type="checkbox" 
                :checked="store.ltfVisibility.showExtended"
                @change="store.toggleLTFSetting('showExtended')"
              >
              <span>Show Extended</span>
            </div>
          </div>

          <!-- Mitigated Settings -->
          <div class="toggle-group">
            <div 
              class="toggle-item" 
              :class="{ active: store.ltfVisibility.showMitigated }"
              @click="store.toggleLTFSetting('showMitigated')"
            >
              <input 
                type="checkbox" 
                :checked="store.ltfVisibility.showMitigated"
                @change="store.toggleLTFSetting('showMitigated')"
              >
              <span>Show Mitigated</span>
            </div>
            <div 
              class="toggle-item" 
              :class="{ active: store.ltfVisibility.deleteMitigated }"
              @click="store.toggleLTFSetting('deleteMitigated')"
            >
              <input 
                type="checkbox" 
                :checked="store.ltfVisibility.deleteMitigated"
                @change="store.toggleLTFSetting('deleteMitigated')"
              >
              <span>Delete Mitigated</span>
            </div>
          </div>

          <!-- Mitigated Fill Setting -->
          <div class="slider-group">
            <label>Mitigated Fill:</label>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1"
              :value="store.ltfVisibility.mitigatedFill"
              @input="store.updateMitigatedFill(parseFloat($event.target.value))"
            >
            <span>{{ (store.ltfVisibility.mitigatedFill * 100).toFixed(0) }}%</span>
          </div>
        </div>

        <div>
          <!-- Color Settings -->
          <div class="color-picker">
            <label>Bullish Color:</label>
            <input 
              type="color" 
              :value="store.colors.bullish"
              @input="store.updateColor('bullish', $event.target.value)"
            >
          </div>

          <div class="color-picker">
            <label>Bearish Color:</label>
            <input 
              type="color" 
              :value="store.colors.bearish"
              @input="store.updateColor('bearish', $event.target.value)"
            >
          </div>

          <div class="color-picker">
            <label>Partially Mitigated Color:</label>
            <input 
              type="color" 
              :value="store.colors.partiallyMitigated"
              @input="store.updateColor('partiallyMitigated', $event.target.value)"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- EOB Identification Settings -->
    <div class="panel">
      <div class="panel-header">EOB Identification Settings</div>
      
      <div class="grid-2">
        <div>
          <div class="slider-group">
            <label>Minimum Wick Size:</label>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1"
              :value="store.eobSettings.minWickSize"
              @input="store.updateEOBSetting('minWickSize', parseFloat($event.target.value))"
            >
            <span>{{ (store.eobSettings.minWickSize * 100).toFixed(0) }}%</span>
          </div>

          <div class="toggle-group">
            <div 
              class="toggle-item" 
              :class="{ active: store.eobSettings.confirmationRequired }"
              @click="store.updateEOBSetting('confirmationRequired', !store.eobSettings.confirmationRequired)"
            >
              <input 
                type="checkbox" 
                :checked="store.eobSettings.confirmationRequired"
                @change="store.updateEOBSetting('confirmationRequired', $event.target.checked)"
              >
              <span>Confirmation Required</span>
            </div>
            <div 
              class="toggle-item" 
              :class="{ active: store.eobSettings.fractalEnabled }"
              @click="store.updateEOBSetting('fractalEnabled', !store.eobSettings.fractalEnabled)"
            >
              <input 
                type="checkbox" 
                :checked="store.eobSettings.fractalEnabled"
                @change="store.updateEOBSetting('fractalEnabled', $event.target.checked)"
              >
              <span>Fractal EOBs Enabled</span>
            </div>
          </div>
        </div>

        <div>
          <div class="panel-header">EOB Detection Info</div>
          <div style="font-size: 14px; color: var(--secondary-text);">
            <p><strong>Bullish EOB:</strong> Bearish candle with wick on top + bullish engulfing confirmation</p>
            <p><strong>Bearish EOB:</strong> Bullish candle with wick on bottom + bearish engulfing confirmation</p>
            <p><strong>Fractal Nature:</strong> EOBs can be identified across all timeframes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useEOBStore } from '../stores/eobStore'

const store = useEOBStore()
</script>

<style scoped>
.eob-settings {
  max-width: 1200px;
  margin: 0 auto;
}

.panel {
  margin-bottom: 20px;
}

.toggle-group {
  margin-bottom: 15px;
}

.timeframe-section {
  margin-bottom: 20px;
}

.grid-2 {
  gap: 30px;
}

.color-picker {
  margin-bottom: 15px;
}

.slider-group {
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>