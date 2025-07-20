import { defineStore } from 'pinia'

export const useEOBStore = defineStore('eob', {
  state: () => ({
    // Wick and Body settings
    wickClose: true,
    bodyClose: true,
    
    // Timeframe visibility settings
    timeframes: {
      '1w': { enabled: false, label: '1 Week' },
      '1d': { enabled: false, label: '1 Day' },
      '4h': { enabled: false, label: '4 Hour' },
      '2h': { enabled: false, label: '2 Hour' },
      '1h': { enabled: false, label: '1 Hour' },
      '30m': { enabled: false, label: '30 Minutes' },
      '15m': { enabled: false, label: '15 Minutes' },
      '5m': { enabled: false, label: '5 Minutes' },
      '3m': { enabled: false, label: '3 Minutes' }
    },
    
    // HTF settings
    showHTFSavedEOBs: false,
    
    // LTF settings
    ltfVisibility: {
      enabled: false,
      width: 2,
      showEQ: true,
      showExtended: false,
      showMitigated: true,
      mitigatedFill: 0.5, // 0.5 for half fill, 1 for full fill
      deleteMitigated: false
    },
    
    // Color settings
    colors: {
      bullish: '#00d4aa',
      bearish: '#ff4757',
      partiallyMitigated: '#ffa502'
    },
    
    // EOB identification settings
    eobSettings: {
      minWickSize: 0.3, // Minimum wick size as percentage of candle body
      confirmationRequired: true,
      fractalEnabled: true
    }
  }),
  
  getters: {
    enabledTimeframes: (state) => {
      return Object.entries(state.timeframes)
        .filter(([_, config]) => config.enabled)
        .map(([key, config]) => ({ key, ...config }))
    },
    
    isLTFEnabled: (state) => state.ltfVisibility.enabled,
    
    getColor: (state) => (type) => {
      return state.colors[type] || '#ffffff'
    }
  },
  
  actions: {
    toggleWickClose() {
      this.wickClose = !this.wickClose
    },
    
    toggleBodyClose() {
      this.bodyClose = !this.bodyClose
    },
    
    toggleTimeframe(timeframe) {
      if (this.timeframes[timeframe]) {
        this.timeframes[timeframe].enabled = !this.timeframes[timeframe].enabled
      }
    },
    
    toggleHTFSavedEOBs() {
      this.showHTFSavedEOBs = !this.showHTFSavedEOBs
    },
    
    toggleLTFVisibility() {
      this.ltfVisibility.enabled = !this.ltfVisibility.enabled
    },
    
    updateLTFWidth(width) {
      this.ltfVisibility.width = width
    },
    
    toggleLTFSetting(setting) {
      if (this.ltfVisibility.hasOwnProperty(setting)) {
        this.ltfVisibility[setting] = !this.ltfVisibility[setting]
      }
    },
    
    updateMitigatedFill(fill) {
      this.ltfVisibility.mitigatedFill = fill
    },
    
    updateColor(type, color) {
      if (this.colors.hasOwnProperty(type)) {
        this.colors[type] = color
      }
    },
    
    updateEOBSetting(setting, value) {
      if (this.eobSettings.hasOwnProperty(setting)) {
        this.eobSettings[setting] = value
      }
    },
    
    // EOB Detection Logic
    detectBullishEOB(candles, index) {
      if (index < 1) return null
      
      const current = candles[index]
      const previous = candles[index - 1]
      
      // Check if previous candle is bearish with decent wick on top
      const previousBody = Math.abs(previous.close - previous.open)
      const previousWick = previous.high - Math.max(previous.open, previous.close)
      const wickRatio = previousWick / previousBody
      
      if (previous.close < previous.open && // Bearish candle
          wickRatio >= this.eobSettings.minWickSize && // Decent wick
          current.close > current.open && // Current candle is bullish
          current.close > previous.open) { // Engulfing pattern
        
        return {
          type: 'bullish',
          setupCandle: index - 1,
          confirmationCandle: index,
          zone: {
            high: previous.high,
            low: previous.low
          },
          timeframe: '1h' // Default for this example
        }
      }
      
      return null
    },
    
    detectBearishEOB(candles, index) {
      if (index < 1) return null
      
      const current = candles[index]
      const previous = candles[index - 1]
      
      // Check if previous candle is bullish with decent wick on bottom
      const previousBody = Math.abs(previous.close - previous.open)
      const previousWick = Math.min(previous.open, previous.close) - previous.low
      const wickRatio = previousWick / previousBody
      
      if (previous.close > previous.open && // Bullish candle
          wickRatio >= this.eobSettings.minWickSize && // Decent wick
          current.close < current.open && // Current candle is bearish
          current.close < previous.open) { // Engulfing pattern
        
        return {
          type: 'bearish',
          setupCandle: index - 1,
          confirmationCandle: index,
          zone: {
            high: previous.high,
            low: previous.low
          },
          timeframe: '1h' // Default for this example
        }
      }
      
      return null
    },
    
    detectAllEOBs(candles, timeframe = '1h') {
      const eobs = []
      
      for (let i = 1; i < candles.length; i++) {
        const bullishEOB = this.detectBullishEOB(candles, i)
        const bearishEOB = this.detectBearishEOB(candles, i)
        
        if (bullishEOB) {
          bullishEOB.timeframe = timeframe
          eobs.push(bullishEOB)
        }
        
        if (bearishEOB) {
          bearishEOB.timeframe = timeframe
          eobs.push(bearishEOB)
        }
      }
      
      return eobs
    }
  }
})