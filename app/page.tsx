"use client"

import { AdvancedShockwavesChart } from "@/components/advanced-shockwaves-chart"
import { CrashTimeline } from "@/components/crash-timeline"
import { Header } from "@/components/header"
import { ImpactCards } from "@/components/impact-cards"
import { ElliottWavePanel } from "@/components/elliott-wave-panel"
import { useState } from "react"
import { defaultTheme } from "@/lib/theme-config"
import { useShockwavesData } from "@/hooks/use-shockwaves-data"
import { FibonacciPanel } from "@/components/fibonacci-panel"
import { TradingViewComparison } from "@/components/tradingview-comparison"
import { ApiStatusIndicator } from "@/components/api-status-indicator"

export default function HomePage() {
  const [showWaves, setShowWaves] = useState(true)
  const [visibleDegrees, setVisibleDegrees] = useState(["grand-supercycle", "supercycle", "cycle"])
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [showFibonacci, setShowFibonacci] = useState(false)
  const [selectedFibPoint, setSelectedFibPoint] = useState("great-bull")

  const handleToggleDegree = (degreeId: string) => {
    setVisibleDegrees((prev) => (prev.includes(degreeId) ? prev.filter((id) => id !== degreeId) : [...prev, degreeId]))
  }

  const { data, loading, error } = useShockwavesData()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background}`}>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              SHOCKWAVES
            </h1>
            <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto`}>
              Professional Candlestick Charts • Logarithmic Scale • Interactive Wave Placement
            </p>
            <div className={`flex justify-center flex-wrap gap-4 text-sm ${currentTheme.textSecondary}`}>
              <span>🕯️ Candlesticks</span>
              <span>📊 Log Scale</span>
              <span>🌊 Interactive Waves</span>
              <span>🎨 Custom Themes</span>
            </div>
          </div>

          {/* API Status Indicator */}
          {data.apiStatus && (
            <ApiStatusIndicator
              apiStatus={data.apiStatus}
              dataSource={data.source}
              apiError={data.apiError || null}
              dataPoints={data.dataPoints || 0}
              hasApiKey={data.meta?.hasApiKey || false}
              liveDataInfo={data.liveDataInfo}
            />
          )}

          <ImpactCards />

          {/* Hoofdgrafiek - volledige breedte */}
          <div className="w-full">
            <AdvancedShockwavesChart
              showWaves={showWaves}
              visibleDegrees={visibleDegrees}
              showFibonacci={showFibonacci}
              selectedFibPoint={selectedFibPoint}
            />
          </div>

          {/* Panelen onder de grafiek in een grid van 3 kolommen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CrashTimeline />
            </div>
            <div className="lg:col-span-1">
              <ElliottWavePanel
                visibleDegrees={visibleDegrees}
                onToggleDegree={handleToggleDegree}
                showWaves={showWaves}
                onToggleWaves={setShowWaves}
              />
            </div>
            <div className="lg:col-span-1">
              <FibonacciPanel
                showFibonacci={showFibonacci}
                onToggleFibonacci={setShowFibonacci}
                selectedFibPoint={selectedFibPoint}
                onSelectFibPoint={setSelectedFibPoint}
                isLogarithmic={true}
              />
            </div>
          </div>

          {/* TradingView Comparison */}
          <div className="mt-8">
            <TradingViewComparison />
          </div>
        </div>
      </main>
    </div>
  )
}
