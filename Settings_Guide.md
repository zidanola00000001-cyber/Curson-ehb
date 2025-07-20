# EOB Indicator Settings Quick Reference

## 🔧 General Settings
| Setting | Default | Description |
|---------|---------|-------------|
| **Use Confirmation** | ✅ ON | Requires confirmation candle for EOB identification |
| **Wick Close Toggle** | ✅ ON | Includes wick in close calculations |
| **Body Close Toggle** | ❌ OFF | Uses body close instead of full candle close |

## 📈 Multi-Timeframe (HTF) Settings
| Timeframe | Default | Purpose |
|-----------|---------|---------|
| **1 Week EOB** | ❌ OFF | Very long-term structural levels |
| **1 Day EOB** | ✅ ON | Daily structural levels |
| **4 Hour EOB** | ✅ ON | H4 structural levels |
| **2 Hour EOB** | ❌ OFF | H2 structural levels |

## 📊 Lower Timeframe (LTF) Settings
| Timeframe | Default | Purpose |
|-----------|---------|---------|
| **1 Hour EOB** | ✅ ON | H1 structural levels |
| **30 Minutes EOB** | ❌ OFF | M30 structural levels |
| **15 Minutes EOB** | ❌ OFF | M15 structural levels |
| **5 Minutes EOB** | ❌ OFF | M5 structural levels |
| **3 Minutes EOB** | ❌ OFF | M3 structural levels |

## 🔍 HTF EOB Visibility
| Setting | Default | Description |
|---------|---------|-------------|
| **Show HTF EOBs in Lower Timeframe** | ✅ ON | Displays higher timeframe EOBs on current chart |

## ⚙️ LTF EOB Settings (1h Chart)
| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| **EOB Width** | 2 | 1-10 | Customizable width of EOB zone borders |
| **Show Equilibrium (EQ)** | ✅ ON | - | Displays equilibrium line within EOB |
| **Extend EOB** | ✅ ON | - | Extends EOB zones to the right |

## 🎯 Mitigation Settings
| Setting | Default | Description |
|---------|---------|-------------|
| **Mitigate on Full Fill** | ✅ ON | Marks EOB as mitigated when fully filled |
| **Mitigate on 50% Fill** | ❌ OFF | Marks EOB as mitigated when 50% filled |
| **Delete Mitigated EOBs** | ❌ OFF | Removes mitigated EOBs from chart |

## 🎨 Color Settings
| Element | Default Color | Customizable |
|---------|---------------|--------------|
| **Bullish EOB** | Green (80% transparency) | ✅ |
| **Bearish EOB** | Red (80% transparency) | ✅ |
| **Partially Mitigated** | Orange (60% transparency) | ✅ |
| **Equilibrium Line** | Blue (30% transparency) | ✅ |

## 🚀 Recommended Configurations

### **Scalping Setup (M1-M5)**
```
✅ 5 Minutes EOB: ON
✅ 3 Minutes EOB: ON
✅ 15 Minutes EOB: ON (HTF reference)
✅ Show HTF EOBs: ON
✅ EOB Width: 1-2
✅ Show EQ: ON
✅ Mitigate on 50% Fill: ON
```

### **Day Trading Setup (M15-H1)**
```
✅ 1 Hour EOB: ON
✅ 30 Minutes EOB: ON
✅ 15 Minutes EOB: ON
✅ 4 Hour EOB: ON (HTF reference)
✅ Show HTF EOBs: ON
✅ EOB Width: 2-3
✅ Show EQ: ON
✅ Mitigate on Full Fill: ON
```

### **Swing Trading Setup (H1-D1)**
```
✅ 1 Day EOB: ON
✅ 4 Hour EOB: ON
✅ 1 Hour EOB: ON
✅ 1 Week EOB: ON (HTF reference)
✅ Show HTF EOBs: ON
✅ EOB Width: 3-4
✅ Show EQ: ON
✅ Delete Mitigated: ON
```

### **Position Trading Setup (D1-W1)**
```
✅ 1 Week EOB: ON
✅ 1 Day EOB: ON
✅ 4 Hour EOB: OFF
✅ Show HTF EOBs: ON
✅ EOB Width: 4-5
✅ Show EQ: ON
✅ Delete Mitigated: ON
```

## 💡 Pro Tips

### **Timeframe Selection**
- Enable 2-3 timeframes maximum for clean charts
- Always include one higher timeframe for context
- Current timeframe + 1 HTF is often sufficient

### **Color Coding Strategy**
- Use contrasting colors for bullish/bearish EOBs
- Make partially mitigated EOBs stand out (orange/yellow)
- Keep EQ lines subtle but visible

### **Mitigation Settings**
- **Full Fill**: More conservative, fewer false signals
- **50% Fill**: More aggressive, earlier exits
- **Delete Mitigated**: Keeps charts clean for swing/position trading

### **Width Settings**
- **1-2**: Clean appearance for lower timeframes
- **3-4**: Standard visibility for most charts  
- **5+**: High visibility for important levels only

## 🔄 Performance Optimization

- **Limit active timeframes**: Too many can slow performance
- **Use delete mitigated**: Reduces memory usage
- **Adjust max_boxes_count**: Default 500 should be sufficient
- **Monitor array size**: Indicator manages this automatically