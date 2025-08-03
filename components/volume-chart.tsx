"use client"

import { Bar } from "react-chartjs-2"
import { useMemo } from "react"

export default function VolumeChart() {
  const chartData = useMemo(() => {
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
    const volumeData = []
    const colors = []

    for (let i = 0; i < 30; i++) {
      // Generate realistic volume data
      const baseVolume = 1000000000 // 1B base volume
      const volatility = 0.5
      const volume = baseVolume * (1 + (Math.random() - 0.5) * volatility)
      volumeData.push(volume)

      // Color bars based on price movement (green for up, red for down)
      colors.push(Math.random() > 0.5 ? "#28A745" : "#DC3545")
    }

    return {
      labels,
      datasets: [
        {
          label: "Volume",
          data: volumeData,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
          borderRadius: 2,
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
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y
            return `Volume: ${(value / 1000000000).toFixed(2)}B`
          },
        },
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
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9CA3AF",
          callback: (value: any) => (value / 1000000000).toFixed(1) + "B",
        },
      },
    },
  }

  return <Bar data={chartData} options={options} />
}
