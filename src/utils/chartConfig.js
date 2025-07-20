import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

// Custom candlestick chart type
Chart.register({
  id: 'candlestick',
  beforeInit(chart) {
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      dataset.type = 'bar'
      dataset.barPercentage = 0.8
      dataset.categoryPercentage = 0.9
    })
  },
  beforeDraw(chart) {
    const ctx = chart.ctx
    const datasets = chart.data.datasets
    
    datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex)
      if (!meta.visible) return
      
      dataset.data.forEach((point, index) => {
        const element = meta.data[index]
        if (!element) return
        
        const { x, y } = element.getCenterPoint()
        const width = element.width * 0.8
        
        // Draw candlestick body
        const bodyTop = Math.min(point.o, point.c)
        const bodyBottom = Math.max(point.o, point.c)
        const bodyHeight = bodyBottom - bodyTop
        
        ctx.fillStyle = point.c >= point.o ? '#00d4aa' : '#ff4757'
        ctx.fillRect(x - width/2, bodyTop, width, bodyHeight)
        
        // Draw wicks
        ctx.strokeStyle = point.c >= point.o ? '#00d4aa' : '#ff4757'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, point.h)
        ctx.lineTo(x, bodyBottom)
        ctx.moveTo(x, bodyTop)
        ctx.lineTo(x, point.l)
        ctx.stroke()
      })
    })
  }
})

// Custom annotation plugin for EOB zones
export const createEOBAnnotations = (eobs, colors, settings) => {
  return eobs.map((eob, index) => {
    const color = eob.type === 'bullish' ? colors.bullish : colors.bearish
    const alpha = settings.ltfVisibility.enabled ? 0.3 : 0.1
    
    return {
      type: 'box',
      xMin: eob.setupCandle,
      xMax: eob.confirmationCandle + 1,
      yMin: eob.zone.low,
      yMax: eob.zone.high,
      backgroundColor: color + Math.floor(alpha * 255).toString(16).padStart(2, '0'),
      borderColor: color,
      borderWidth: settings.ltfVisibility.width || 2,
      label: {
        content: `${eob.type.toUpperCase()} EOB`,
        position: 'start',
        color: '#ffffff',
        font: {
          size: 10,
          weight: 'bold'
        }
      }
    }
  })
}

export const createChartConfig = (data, eobs = [], colors = {}, settings = {}) => {
  return {
    type: 'candlestick',
    data: {
      datasets: [{
        label: 'Price',
        data: data,
        borderColor: '#ffffff',
        borderWidth: 1,
        backgroundColor: (context) => {
          const candle = context.raw
          return candle.c >= candle.o ? '#00d4aa' : '#ff4757'
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          callbacks: {
            label: function(context) {
              const point = context.raw
              return [
                `Open: ${point.o.toFixed(2)}`,
                `High: ${point.h.toFixed(2)}`,
                `Low: ${point.l.toFixed(2)}`,
                `Close: ${point.c.toFixed(2)}`
              ]
            }
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          display: true,
          grid: {
            color: '#333333'
          },
          ticks: {
            color: '#ffffff',
            maxTicksLimit: 10
          }
        },
        y: {
          display: true,
          grid: {
            color: '#333333'
          },
          ticks: {
            color: '#ffffff'
          }
        }
      },
      elements: {
        point: {
          radius: 0
        }
      }
    }
  }
}