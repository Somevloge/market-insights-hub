"use client"

import { Line } from "react-chartjs-2"
import { useMemo } from "react"

export default function RSIChart() {
  const chartData = useMemo(() => {
    // Generate RSI data (0-100 range)
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    const rsiData = []

    for (let i = 0; i < 30; i++) {
      // Generate realistic RSI values
      const baseRSI = 50
      const volatility = 15
      const rsi = Math.max(0, Math.min(100, baseRSI + (Math.random() - 0.5) * volatility))
      rsiData.push(rsi)
    }

    return {
      labels,
      datasets: [
        {
          label: "RSI",
          data: rsiData,
          borderColor: "#007BFF",
          backgroundColor: "rgba(0, 123, 255, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    }
  }, [])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#007BFF",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
          maxTicksLimit: 6,
        },
      },
      y: {
        display: true,
        min: 0,
        max: 100,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
        },
      },
    },
    // Add horizontal lines for overbought/oversold levels
    annotation: {
      annotations: {
        overbought: {
          type: "line",
          yMin: 70,
          yMax: 70,
          borderColor: "#DC3545",
          borderWidth: 1,
          borderDash: [5, 5],
        },
        oversold: {
          type: "line",
          yMin: 30,
          yMax: 30,
          borderColor: "#28A745",
          borderWidth: 1,
          borderDash: [5, 5],
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}
