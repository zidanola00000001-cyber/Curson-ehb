# Advanced EOB (Equilibrium Order Block) Indicator

A comprehensive TradingView Pine Script indicator for identifying and managing Equilibrium Order Blocks (EOBs) across multiple timeframes with advanced customization options.

## 🚀 Features

### 📊 **Multi-Timeframe Support**
- **Higher Timeframe (HTF) Options:**
  - 1 Week EOB (Toggle On/Off)
  - 1 Day EOB (Toggle On/Off)
  - 4 Hour EOB (Toggle On/Off)
  - 2 Hour EOB (Toggle On/Off)

- **Lower Timeframe (LTF) Options:**
  - 1 Hour EOB (Toggle On/Off)
  - 30 Minutes EOB (Toggle On/Off)
  - 15 Minutes EOB (Toggle On/Off)
  - 5 Minutes EOB (Toggle On/Off)
  - 3 Minutes EOB (Toggle On/Off)

### ⚙️ **Advanced Configuration**

#### **General Settings**
- **Use Confirmation**: Toggle requirement for confirmation candle
- **Wick Close Toggle**: Include wick in close calculations
- **Body Close Toggle**: Use body close instead of full candle close

#### **HTF EOB Visibility**
- **Show HTF EOBs in Lower Timeframe**: Display higher timeframe EOBs on current chart

#### **LTF EOB Settings (1h Chart Specific)**
- **Customizable Width Option**: Adjust EOB zone border width (1-10)
- **Show Equilibrium (EQ)**: Display equilibrium line within EOB zones
- **Extended EOB**: Extend EOB zones to the right

#### **Mitigation Settings**
- **Mitigate on Full Fill**: Mark EOB as mitigated when fully filled
- **Mitigate on 50% Fill**: Mark EOB as mitigated when 50% filled
- **Delete Mitigated EOBs**: Remove mitigated EOBs from chart

#### **Color Customization**
- **Bullish EOB Color**: Customizable color for bullish EOBs
- **Bearish EOB Color**: Customizable color for bearish EOBs
- **Partially Mitigated Color**: Customizable color for partially mitigated EOBs
- **Equilibrium Line Color**: Customizable color for EQ lines

## 📋 **EOB Identification Logic**

### **Bearish EOB Identification**
1. **Setup Candle**: A bullish candle with a "decent sized wick on the bottom" forms, indicating a rejection of lower prices after buying pressure
2. **Confirmation Candle**: The next candle must be bearish and close below the body of the bullish candle (an engulfing pattern), signaling bearish momentum
3. **EOB Zone Definition**: The EOB zone spans from the low of the bullish candle (including the wick) to the high of the bullish candle

### **Bullish EOB Identification**
1. **Setup Candle**: A bearish candle with a "decent sized wick on the top" forms, indicating a rejection of higher prices after selling pressure
2. **Confirmation Candle**: The next candle must be bullish and close above the body of the bearish candle (an engulfing pattern), signaling bullish momentum
3. **EOB Zone Definition**: The EOB zone spans from the high of the bearish candle (including the wick) to the low of the bearish candle

## 🎯 **Mitigation Logic**

### **Full Mitigation**
- **Bullish EOB**: Occurs when price moves back down to or below the EOB low
- **Bearish EOB**: Occurs when price moves back up to or above the EOB high

### **Partial Mitigation (50%)**
- **Bullish EOB**: Occurs when price moves back down to the equilibrium level
- **Bearish EOB**: Occurs when price moves back up to the equilibrium level

## 🔧 **Installation & Usage**

1. **Copy the Pine Script code** from `EOB_Indicator.pine`
2. **Open TradingView** and go to Pine Editor
3. **Paste the code** and click "Add to Chart"
4. **Configure settings** according to your preferences
5. **Enable desired timeframes** using the toggle options

## 📈 **Key Features Explained**

### **Fractal Nature**
EOBs are fractal and can be identified across all timeframes, making this indicator versatile for different trading styles and timeframes.

### **Wick Requirements**
The indicator checks for "decent sized wicks" (minimum 30% of candle body size) to ensure quality setups and reduce false signals.

### **Multi-Timeframe Integration**
- View HTF EOBs on lower timeframe charts
- Comprehensive coverage from 3-minute to weekly timeframes
- Individual toggle controls for each timeframe

### **Visual Enhancements**
- Customizable colors for different EOB states
- Equilibrium lines for precise entry/exit points
- Information table showing EOB counts
- Alert system for new EOB formations

## 🔔 **Alerts**

The indicator includes built-in alert conditions for:
- New Bearish EOB Detection
- New Bullish EOB Detection

## 📊 **Information Display**

A real-time information table shows:
- Current timeframe EOB counts
- Bullish vs Bearish EOB distribution
- Visual summary of active EOBs

## 🎨 **Customization Options**

All visual aspects are fully customizable:
- EOB zone colors and transparency
- Border width and styles
- Equilibrium line appearance
- Mitigation state colors

## 💡 **Trading Applications**

1. **Reversal Trading**: Use EOBs as reversal zones
2. **Confluence Analysis**: Combine multiple timeframe EOBs
3. **Risk Management**: Use mitigation levels for stop losses
4. **Entry Timing**: Use equilibrium levels for precise entries

## 🔄 **Updates & Maintenance**

The indicator automatically:
- Tracks EOB mitigation states
- Updates visual elements in real-time
- Manages EOB lifecycle (creation, mitigation, deletion)
- Maintains performance with efficient array management

---

**Note**: This indicator implements the exact EOB identification criteria as specified, ensuring accurate detection of these important market structures across all timeframes.