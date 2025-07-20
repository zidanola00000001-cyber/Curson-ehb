# EOB Trading Indicator

Advanced End of Block (EOB) Trading Indicator System with comprehensive settings and multi-timeframe support.

## Features

### Core EOB Detection
- **Bullish EOB**: Bearish candle with wick on top + bullish engulfing confirmation
- **Bearish EOB**: Bullish candle with wick on bottom + bearish engulfing confirmation
- **Fractal Nature**: EOBs can be identified across all timeframes

### Wick & Body Settings
- ✅ Wick Close toggle on/off
- ✅ Body Close toggle on/off

### Timeframe Visibility (HTF & LTF)
- ✅ 1 Week EOB toggle on/off
- ✅ 1 Day EOB toggle on/off  
- ✅ 4 Hour EOB toggle on/off
- ✅ 2 Hour EOB toggle on/off
- ✅ 1 Hour EOB toggle on/off
- ✅ 30 Minutes EOB toggle on/off
- ✅ 15 Minutes EOB toggle on/off
- ✅ 5 Minutes EOB toggle on/off
- ✅ 3 Minutes EOB toggle on/off

### HTF Settings
- ✅ Show HTF saved/marked EOBs in lower timeframes toggle on/off

### LTF EOBs Visibility (1h Chart Only)
- ✅ Customizable width option (1-10px)
- ✅ Show EQ toggle on/off
- ✅ Show Extended toggle on/off
- ✅ Show Mitigated toggle on/off
- ✅ Delete Mitigated toggle on/off
- ✅ Mitigated fill customization (10%-100%)

### Color Customization
- ✅ Bullish EOB color picker
- ✅ Bearish EOB color picker
- ✅ Partially Mitigated color picker

### EOB Identification Settings
- ✅ Minimum wick size slider (10%-100%)
- ✅ Confirmation required toggle
- ✅ Fractal EOBs enabled toggle

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Configure Settings**: Use the settings panel to customize EOB detection parameters
2. **Generate Sample Data**: Click "Generate Sample Data" to create test candlestick data
3. **Detect EOBs**: Click "Detect EOBs" to identify EOB patterns in the data
4. **Visualize**: View detected EOBs as colored zones on the candlestick chart

## Technical Details

### EOB Detection Algorithm

**Bullish EOB Pattern:**
1. Setup Candle: Bearish candle with "decent sized wick on top"
2. Confirmation Candle: Bullish candle that closes above the bearish candle's open
3. EOB Zone: From low to high of the bearish candle (including wick)

**Bearish EOB Pattern:**
1. Setup Candle: Bullish candle with "decent sized wick on bottom"  
2. Confirmation Candle: Bearish candle that closes below the bullish candle's open
3. EOB Zone: From high to low of the bullish candle (including wick)

### Architecture
- **Vue 3** with Composition API
- **Pinia** for state management
- **Chart.js** for candlestick visualization
- **Custom EOB detection algorithms**
- **Responsive design** with dark theme

## License

MIT License