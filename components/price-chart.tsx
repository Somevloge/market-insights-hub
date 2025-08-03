"use client"

import { Line } from "react-chartjs-2"
import { useMemo } from "react"

interface PriceChartProps {
  asset: string
  timeframe: string
  indicators: string[]
}

export default function PriceChart({ asset, timeframe, indicators }: PriceChartProps) {
  // Generate mock price data based on asset and timeframe
  const generatePriceData = (asset: string, timeframe: string) => {
    const basePrice = asset.includes("BTC") ? 67000 : asset.includes("ETH") ? 3500 : 1.1
    const points = timeframe === "1H" ? 24 : timeframe === "1D" ? 30 : timeframe === "1W" ? 7 : 12

    const labels = []
    const prices = []
    const ma20 = []
    const ma50 = []

    for (let i = 0; i < points; i++) {
      // Generate labels based on timeframe
      if (timeframe === "1H") {
        labels.push(`${i}:00`)
      } else if (timeframe === "1D") {
        labels.push(`Day ${i + 1}`)
      } else if (timeframe === "1W") {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        labels.push(days[i])
      } else {
        labels.push(`Month ${i + 1}`)
      }

      // Generate realistic price movements
      const volatility = asset.includes("BTC") ? 0.03 : asset.includes("ETH") ? 0.04 : 0.001
      const change = (Math.random() - 0.5) * volatility
      const price = i === 0 ? basePrice : prices[i - 1] * (1 + change)
      prices.push(price)

      // Calculate moving averages
      if (i >= 19) {
        const ma20Value = prices.slice(i - 19, i + 1).reduce((a, b) => a + b, 0) / 20
        ma20.push(ma20Value)
      } else {
        ma20.push(null)
      }

      if (i >= 49) {
        const ma50Value = prices.slice(i - 49, i + 1).reduce((a, b) => a + b, 0) / 50
        ma50.push(ma50Value)
      } else {
        ma50.push(null)
      }
    }

    return { labels, prices, ma20, ma50 }
  }

  const chartData = useMemo(() => {
    const data = generatePriceData(asset, timeframe)

    const datasets = [
      {
        label: `${asset} Price`,
        data: data.prices,
        borderColor: "#007BFF",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ]

    // Add moving averages if selected
    if (indicators.includes("MA")) {
      datasets.push(
        {
          label: "MA20",
          data: data.ma20,
          borderColor: "#28A745",
          backgroundColor: "transparent",
          borderWidth: 1,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          borderDash: [5, 5],
        },
        {
          label: "MA50",
          data: data.ma50,
          borderColor: "#FFC107",
          backgroundColor: "transparent",
          borderWidth: 1,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          borderDash: [10, 5],
        },
      )
    }

    return {
      labels: data.labels,
      datasets,
    }
  }, [asset, timeframe, indicators])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#007BFF",
        borderWidth: 1,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
          callback: (value: any) => {
            if (asset.includes("USD") && !asset.includes("BTC") && !asset.includes("ETH")) {
              return value.toFixed(4)
            }
            return "$" + value.toLocaleString()
          },
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}
