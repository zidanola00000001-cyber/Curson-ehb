// Demo data generator for EOB testing
export const generateEOBDemoData = () => {
  const data = []
  let price = 100
  const volatility = 1.5
  
  // Generate 100 candles with some EOB patterns
  for (let i = 0; i < 100; i++) {
    let open, high, low, close
    
    // Create some EOB patterns at specific intervals
    if (i === 15) {
      // Bullish EOB setup: bearish candle with wick on top
      open = price + 2
      close = price - 1
      high = open + 3  // Large wick on top
      low = close - 0.5
      price = close
    } else if (i === 16) {
      // Bullish EOB confirmation: bullish engulfing
      open = price - 0.5
      close = price + 2.5  // Engulfs previous candle
      high = close + 1
      low = open - 0.5
      price = close
    } else if (i === 35) {
      // Bearish EOB setup: bullish candle with wick on bottom
      open = price - 1
      close = price + 2
      high = close + 0.5
      low = open - 3  // Large wick on bottom
      price = close
    } else if (i === 36) {
      // Bearish EOB confirmation: bearish engulfing
      open = price + 0.5
      close = price - 2.5  // Engulfs previous candle
      high = open + 0.5
      low = close - 1
      price = close
    } else if (i === 55) {
      // Another bullish EOB setup
      open = price + 1.5
      close = price - 0.5
      high = open + 2.5  // Large wick on top
      low = close - 0.5
      price = close
    } else if (i === 56) {
      // Another bullish EOB confirmation
      open = price - 0.5
      close = price + 2  // Engulfs previous candle
      high = close + 1
      low = open - 0.5
      price = close
    } else if (i === 75) {
      // Another bearish EOB setup
      open = price - 0.5
      close = price + 1.5
      high = close + 0.5
      low = open - 2.5  // Large wick on bottom
      price = close
    } else if (i === 76) {
      // Another bearish EOB confirmation
      open = price + 0.5
      close = price - 2  // Engulfs previous candle
      high = open + 0.5
      low = close - 1
      price = close
    } else {
      // Normal random candles
      open = price
      const change = (Math.random() - 0.5) * volatility
      close = open + change
      high = Math.max(open, close) + Math.random() * volatility
      low = Math.min(open, close) - Math.random() * volatility
      price = close
    }
    
    data.push({
      time: i,
      open: open,
      high: high,
      low: low,
      close: close
    })
  }
  
  return data
}

// Generate random candlestick data
export const generateRandomData = (count = 50) => {
  const data = []
  let price = 100
  const volatility = 2
  
  for (let i = 0; i < count; i++) {
    const open = price
    const change = (Math.random() - 0.5) * volatility
    const close = open + change
    const high = Math.max(open, close) + Math.random() * volatility
    const low = Math.min(open, close) - Math.random() * volatility
    
    data.push({
      time: i,
      open: open,
      high: high,
      low: low,
      close: close
    })
    
    price = close
  }
  
  return data
}

// Generate trending data with EOB patterns
export const generateTrendingData = () => {
  const data = []
  let price = 100
  let trend = 0.1  // Slight uptrend
  
  for (let i = 0; i < 80; i++) {
    let open, high, low, close
    
    // Add some EOB patterns in trending market
    if (i === 20) {
      // Bullish EOB in uptrend
      open = price + 1
      close = price - 0.5
      high = open + 2.5  // Large wick on top
      low = close - 0.5
      price = close
    } else if (i === 21) {
      // Bullish EOB confirmation
      open = price - 0.5
      close = price + 2  // Engulfs previous candle
      high = close + 1
      low = open - 0.5
      price = close
    } else if (i === 50) {
      // Bearish EOB in uptrend
      open = price - 0.5
      close = price + 1.5
      high = close + 0.5
      low = open - 2.5  // Large wick on bottom
      price = close
    } else if (i === 51) {
      // Bearish EOB confirmation
      open = price + 0.5
      close = price - 2  // Engulfs previous candle
      high = open + 0.5
      low = close - 1
      price = close
    } else {
      // Normal trending candles
      open = price
      const change = (Math.random() - 0.5) * 1.5 + trend
      close = open + change
      high = Math.max(open, close) + Math.random() * 1.5
      low = Math.min(open, close) - Math.random() * 1.5
      price = close
      
      // Gradually increase trend
      trend += 0.01
    }
    
    data.push({
      time: i,
      open: open,
      high: high,
      low: low,
      close: close
    })
  }
  
  return data
}