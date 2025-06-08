"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
  Bar,
  Tooltip,
  Line,
  Scatter,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Zap, MousePointer, Palette, History, LineChart } from "lucide-react"
import { useShockwavesData } from "@/hooks/use-shockwaves-data"
import { elliotWaves, elliotWaveDegrees } from "@/lib/crash-data"
import { chartThemes, defaultTheme, type ChartTheme } from "@/lib/theme-config"
import { Candlestick } from "./candlestick-chart"
import { historicalDjiaData, majorElliottWaves, majorMarketCrashes, warsAndMarkets } from "@/lib/historical-djia-data"
import { historicalFibonacciPoints, getAllHistoricalFibLevels } from "@/lib/fibonacci-levels"

interface AdvancedShockwavesChartProps {
  showWaves?: boolean
  visibleDegrees?: string[]
  showFibonacci?: boolean
  selectedFibPoint?: string
}

interface UserWave {
  year: number
  date?: string
  degree: string
  wave: string
  type: string
  title: string
  id: string
  price?: number
}

// Nieuwe interval types
type IntervalType = "1W" | "1M" | "3M" | "6M" | "1Y" | "5Y" | "10Y" | "25Y" | "50Y" | "ALL"

export function AdvancedShockwavesChart({
  showWaves: showWavesProp = true,
  visibleDegrees: visibleDegreesProp = ["grand-supercycle", "supercycle", "cycle"],
  showFibonacci: showFibonacciProp = false,
  selectedFibPoint: selectedFibPointProp = "great-bull",
}: AdvancedShockwavesChartProps) {
  const [selectedInterval, setSelectedInterval] = useState<IntervalType>("ALL")
  const [showCrashes, setShowCrashes] = useState(true)
  const [showWars, setShowWars] = useState(false)
  const [showWaves, setShowWaves] = useState(showWavesProp)
  const [visibleDegrees, setVisibleDegrees] = useState(visibleDegreesProp)
  const [isLogarithmic, setIsLogarithmic] = useState(true)
  const [currentTheme, setCurrentTheme] = useState<ChartTheme>(defaultTheme)
  const [isPlacingWave, setIsPlacingWave] = useState(false)
  const [selectedWaveDegree, setSelectedWaveDegree] = useState("cycle")
  const [selectedWaveType, setSelectedWaveType] = useState("1")
  const [userWaves, setUserWaves] = useState<UserWave[]>([])
  const [showHistoricalData, setShowHistoricalData] = useState(true)
  const [showFibonacci, setShowFibonacci] = useState(showFibonacciProp)
  const [selectedFibPoint, setSelectedFibPoint] = useState(selectedFibPointProp)
  const [showWaveLines, setShowWaveLines] = useState(true)
  const chartRef = useRef<any>(null)

  // Sync with props when they change
  useEffect(() => {
    setShowWaves(showWavesProp)
  }, [showWavesProp])

  useEffect(() => {
    setVisibleDegrees(visibleDegreesProp)
  }, [visibleDegreesProp])

  useEffect(() => {
    setShowFibonacci(showFibonacciProp)
  }, [showFibonacciProp])

  useEffect(() => {
    setSelectedFibPoint(selectedFibPointProp)
  }, [selectedFibPointProp])

  const { data, loading } = useShockwavesData()
  const { crashes: recentCrashes } = data

  // Combineer historische data met recente data
  const allMarketData = useMemo(() => {
    // Gebruik altijd de historische data vanaf 1896 tot 2020
    const historicalData = historicalDjiaData

    // Voeg alleen recente data toe (vanaf 2020) als die beschikbaar is
    const recentData =
      data.historicalData?.filter((item) => {
        const year = item.year || new Date(item.date).getFullYear()
        return year >= 2020
      }) || []

    // Combineer en sorteer op jaar
    const combined = [...historicalData, ...recentData].sort((a, b) => {
      const yearA = a.year || new Date(a.date).getFullYear()
      const yearB = b.year || new Date(b.date).getFullYear()
      return yearA - yearB
    })

    return combined
  }, [data.historicalData])

  // Combineer alle crashes
  const allCrashes = useMemo(() => {
    return [...majorMarketCrashes, ...(recentCrashes || [])]
  }, [recentCrashes])

  // Combineer alle Elliott Waves
  const allElliottWaves = useMemo(() => {
    return [...majorElliottWaves, ...elliotWaves]
  }, [])

  // Nieuwe intervallen voor lange termijn analyse
  const intervals: { label: string; value: IntervalType }[] = [
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "5Y", value: "5Y" },
    { label: "10Y", value: "10Y" },
    { label: "25Y", value: "25Y" },
    { label: "50Y", value: "50Y" },
    { label: "ALL", value: "ALL" },
  ]

  // Filter data based on selected interval
  const filteredData = useMemo(() => {
    const now = new Date()
    let startDate: Date

    switch (selectedInterval) {
      case "1W":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      case "1M":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        break
      case "3M":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 3)
        break
      case "6M":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 6)
        break
      case "1Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case "5Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 5)
        break
      case "10Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 10)
        break
      case "25Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 25)
        break
      case "50Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 50)
        break
      default:
        // ALL - return all data
        return allMarketData
    }

    // Filter data based on date
    return allMarketData.filter((item) => {
      const itemDate = item.date ? new Date(item.date) : new Date(item.year, 0, 1)
      return itemDate >= startDate
    })
  }, [selectedInterval, allMarketData])

  // Format X-axis labels based on interval
  const formatXAxisTick = (value: string) => {
    if (!value) return ""

    try {
      // Check if value is a year or a date
      if (/^\d{4}$/.test(value)) {
        // It's a year
        return value
      }

      const date = new Date(value)

      switch (selectedInterval) {
        case "1W":
          return date.toLocaleDateString("nl-NL", { day: "numeric", month: "numeric" })
        case "1M":
          return date.toLocaleDateString("nl-NL", { day: "numeric", month: "numeric" })
        case "3M":
        case "6M":
          return date.toLocaleDateString("nl-NL", { month: "short", day: "numeric" })
        case "1Y":
          return date.toLocaleDateString("nl-NL", { month: "short" })
        case "5Y":
        case "10Y":
          return date.getFullYear().toString()
        case "25Y":
        case "50Y":
        case "ALL":
          // Voor lange periodes, toon alleen decennia
          const year = date.getFullYear()
          return year % 10 === 0 ? year.toString() : ""
        default:
          return date.getFullYear().toString()
      }
    } catch (e) {
      return value
    }
  }

  // Handle chart click for wave placement
  const handleChartClick = useCallback(
    (event: any) => {
      if (!isPlacingWave || !event || !event.activeLabel) return

      // Get the clicked data point
      const clickedData = filteredData.find(
        (item) => item.date === event.activeLabel || item.year === event.activeLabel,
      )
      if (!clickedData) return

      const newWave: UserWave = {
        year: clickedData.year || new Date(clickedData.date).getFullYear(),
        date: clickedData.date,
        degree: selectedWaveDegree,
        wave: selectedWaveType,
        type: "user-placed",
        title: `User Wave ${selectedWaveType}`,
        id: `user-${Date.now()}`,
        price: clickedData.close,
      }

      setUserWaves((prev) => [...prev, newWave])
      setIsPlacingWave(false)
    },
    [isPlacingWave, selectedWaveDegree, selectedWaveType, filteredData],
  )

  // Custom candlestick renderer
  const renderCandlestick = (props: any) => {
    return <Candlestick {...props} theme={currentTheme} />
  }

  // Transform data for logarithmic scale
  const transformedData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      logOpen: isLogarithmic ? Math.log10(item.open || 1) : item.open,
      logHigh: isLogarithmic ? Math.log10(item.high || 1) : item.high,
      logLow: isLogarithmic ? Math.log10(item.low || 1) : item.low,
      logClose: isLogarithmic ? Math.log10(item.close || 1) : item.close,
      displayValue: item.close,
    }))
  }, [filteredData, isLogarithmic])

  // Determine which key to use for X-axis
  const xAxisDataKey =
    selectedInterval === "ALL" || selectedInterval === "50Y" || selectedInterval === "25Y" ? "year" : "date"

  // Bereken Fibonacci levels voor geselecteerde punt
  const fibLevels = useMemo(() => {
    if (!showFibonacci) return null
    const allLevels = getAllHistoricalFibLevels(isLogarithmic)
    return allLevels.find((point) => point.id === selectedFibPoint)
  }, [showFibonacci, selectedFibPoint, isLogarithmic])

  // Bereken min en max waarden voor Y-as
  const yDomain = useMemo(() => {
    if (filteredData.length === 0) return [0, 100]

    let minValue = Math.min(...filteredData.map((item) => item.low || item.close))
    let maxValue = Math.max(...filteredData.map((item) => item.high || item.close))

    // Voor logaritmische schaal, zorg ervoor dat we niet onder 1 gaan
    if (isLogarithmic) {
      minValue = Math.max(1, minValue * 0.9)
      maxValue = maxValue * 1.1

      return [Math.log10(minValue), Math.log10(maxValue)]
    } else {
      // Voor lineaire schaal, voeg wat padding toe
      const padding = (maxValue - minValue) * 0.1
      return [Math.max(0, minValue - padding), maxValue + padding]
    }
  }, [filteredData, isLogarithmic])

  // Bereken wave lijnen voor Elliott Waves
  const waveLines = useMemo(() => {
    if (!showWaves || !showWaveLines) return []

    // Combineer alle waves (systeem + gebruiker)
    const allWaves = [...allElliottWaves.filter((wave) => visibleDegrees.includes(wave.degree)), ...userWaves]

    // Sorteer op jaar
    const sortedWaves = [...allWaves].sort((a, b) => a.year - b.year)

    // Groepeer waves per degree
    const wavesByDegree: Record<string, typeof sortedWaves> = {}

    sortedWaves.forEach((wave) => {
      if (!wavesByDegree[wave.degree]) {
        wavesByDegree[wave.degree] = []
      }
      wavesByDegree[wave.degree].push(wave)
    })

    // Maak lijnen voor elke degree
    const lines: Array<{
      degree: string
      color: string
      points: Array<{ x: number; y: number }>
    }> = []

    Object.entries(wavesByDegree).forEach(([degree, waves]) => {
      if (waves.length < 2) return

      const degreeInfo = elliotWaveDegrees.find((d) => d.id === degree)
      if (!degreeInfo) return

      const points = waves
        .map((wave) => {
          const dataPoint = filteredData.find(
            (d) => d.year === wave.year || (d.date && wave.date && d.date === wave.date),
          )

          if (!dataPoint) return null

          return {
            x: dataPoint.year || new Date(dataPoint.date).getFullYear(),
            y: wave.price || dataPoint.close,
            logY: isLogarithmic ? Math.log10(wave.price || dataPoint.close) : wave.price || dataPoint.close,
          }
        })
        .filter(Boolean) as Array<{ x: number; y: number; logY: number }>

      if (points.length >= 2) {
        lines.push({
          degree,
          color: degreeInfo.color,
          points,
        })
      }
    })

    return lines
  }, [showWaves, showWaveLines, allElliottWaves, userWaves, visibleDegrees, filteredData, isLogarithmic])

  // Bereken custom Y-as ticks voor logaritmische schaal
  const getCustomYAxisTicks = () => {
    if (!isLogarithmic) return undefined

    // Vind min en max waarden
    const minValue = Math.min(...filteredData.map((item) => item.low || item.close))
    const maxValue = Math.max(...filteredData.map((item) => item.high || item.close))

    // Bereken logaritmische ticks
    const minLog = Math.floor(Math.log10(Math.max(1, minValue)))
    const maxLog = Math.ceil(Math.log10(maxValue))

    const ticks = []
    for (let i = minLog; i <= maxLog; i++) {
      // Voeg de hoofdtick toe (10^i)
      ticks.push(Math.pow(10, i))

      // Voeg subticks toe voor 2, 5 keer de hoofdtick
      if (i < maxLog) {
        ticks.push(2 * Math.pow(10, i))
        ticks.push(5 * Math.pow(10, i))
      }
    }

    return ticks.map((tick) => (isLogarithmic ? Math.log10(tick) : tick))
  }

  return (
    <Card className={`${currentTheme.cardBackground} backdrop-blur-sm ${currentTheme.border}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-red-400" />
            <div>
              <CardTitle className={`text-xl ${currentTheme.textPrimary} flex items-center space-x-2`}>
                <span>Dow Jones Industrial Average (1896-2025)</span>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardTitle>
              <CardDescription className={currentTheme.textSecondary}>
                125+ jaar marktcycli • Elliott Wave patronen • Crashes & Oorlogen
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={currentTheme.id}
              onValueChange={(value) => {
                const theme = chartThemes.find((t) => t.id === value) || defaultTheme
                setCurrentTheme(theme)
              }}
            >
              <SelectTrigger className="w-40">
                <Palette className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chartThemes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch checked={isLogarithmic} onCheckedChange={setIsLogarithmic} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>Logarithmic Scale</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={showHistoricalData} onCheckedChange={setShowHistoricalData} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>
              <History className="h-4 w-4 inline mr-1" />
              Historische Data (1896-2020)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={showCrashes} onCheckedChange={setShowCrashes} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>💥 Crashes</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={showWars} onCheckedChange={setShowWars} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>⚔️ Oorlogen</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={showWaves} onCheckedChange={setShowWaves} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>🌊 Elliott Waves</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={showWaveLines} onCheckedChange={setShowWaveLines} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>
              <LineChart className="h-4 w-4 inline mr-1" />
              Wave Lijnen
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={showFibonacci} onCheckedChange={setShowFibonacci} />
            <span className={`text-sm ${currentTheme.textSecondary}`}>📐 Fibonacci</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={isPlacingWave ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPlacingWave(!isPlacingWave)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <MousePointer className="h-4 w-4 mr-2" />
              {isPlacingWave ? "Cancel Placement" : "Place Wave"}
            </Button>

            {isPlacingWave && (
              <>
                <Select value={selectedWaveDegree} onValueChange={setSelectedWaveDegree}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {elliotWaveDegrees.map((degree) => (
                      <SelectItem key={degree.id} value={degree.id}>
                        {degree.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedWaveType} onValueChange={setSelectedWaveType}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>

        {/* Interval selector */}
        <div className="flex flex-wrap gap-2">
          {intervals.map((interval) => (
            <Button
              key={interval.value}
              variant={selectedInterval === interval.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedInterval(interval.value)}
              className={
                selectedInterval === interval.value
                  ? "bg-gradient-to-r from-red-600 to-orange-600"
                  : `${currentTheme.border} ${currentTheme.textSecondary} hover:bg-slate-700`
              }
            >
              {interval.label}
            </Button>
          ))}
        </div>

        {/* Fibonacci selector */}
        {showFibonacci && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${currentTheme.textSecondary}`}>📐 Fibonacci:</span>
            <Select value={selectedFibPoint} onValueChange={setSelectedFibPoint}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {historicalFibonacciPoints.map((point) => (
                  <SelectItem key={point.id} value={point.id}>
                    {point.name} ({point.start.year}-{point.end.year})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-[600px]">
            <div className={currentTheme.textSecondary}>Loading market data...</div>
          </div>
        )}

        {!loading && (
          <ChartContainer
            config={{
              candlestick: {
                label: "OHLC",
                color: currentTheme.candlestick.up,
              },
            }}
            className="h-[500px] md:h-[600px] lg:h-[700px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={transformedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                onClick={handleChartClick}
                ref={chartRef}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.grid} className="opacity-30" />
                <XAxis
                  dataKey={xAxisDataKey}
                  tick={{ fontSize: 12, fill: currentTheme.axis }}
                  tickFormatter={formatXAxisTick}
                  minTickGap={20}
                />
                <YAxis
                  type="number"
                  domain={yDomain}
                  ticks={getCustomYAxisTicks()}
                  tick={{ fontSize: 12, fill: currentTheme.axis }}
                  tickFormatter={(value) => {
                    const actualValue = isLogarithmic ? Math.pow(10, value) : value
                    // Gebruik een meer nauwkeurige formattering voor verschillende waardebereiken
                    if (actualValue >= 10000) {
                      return `${(actualValue / 1000).toFixed(0)}k`
                    } else if (actualValue >= 1000) {
                      return `${(actualValue / 1000).toFixed(1)}k`
                    } else {
                      return `${actualValue.toFixed(0)}`
                    }
                  }}
                  scale={isLogarithmic ? "log" : "auto"}
                  allowDataOverflow={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      const crash = allCrashes.find((c) => c.year === data.year)
                      const war = warsAndMarkets.find((w) => w.year === data.year)
                      const wave = allElliottWaves.find((w) => w.year === data.year)
                      const userWave = userWaves.find((w) => w.year === data.year || w.date === data.date)

                      return (
                        <div
                          className={`${currentTheme.cardBackground} p-4 ${currentTheme.border} rounded-lg shadow-xl`}
                        >
                          <p className={`font-bold ${currentTheme.textPrimary} text-lg`}>
                            {data.date ? new Date(data.date).toLocaleDateString("nl-NL") : data.year}
                          </p>
                          <div className={`text-sm ${currentTheme.textSecondary} space-y-1`}>
                            <p>Open: {data.open?.toLocaleString()}</p>
                            <p>High: {data.high?.toLocaleString()}</p>
                            <p>Low: {data.low?.toLocaleString()}</p>
                            <p>Close: {data.close?.toLocaleString()}</p>
                            <p>Volume: {(data.volume / 1000000).toFixed(1)}M</p>
                          </div>

                          {crash && showCrashes && (
                            <div className="mt-3 pt-3 border-t border-slate-600">
                              <Badge variant="destructive" className="mb-2 bg-red-600">
                                💥 {crash.name}
                              </Badge>
                              <p className={`text-sm ${currentTheme.textSecondary} leading-relaxed`}>
                                {crash.description}
                              </p>
                              <p className="text-red-400 font-bold mt-1">Impact: {crash.impact}</p>
                            </div>
                          )}

                          {war && showWars && (
                            <div className="mt-3 pt-3 border-t border-slate-600">
                              <Badge variant="outline" className="mb-2 bg-orange-700">
                                ⚔️ {war.name}
                              </Badge>
                              <p className={`text-sm ${currentTheme.textSecondary} leading-relaxed`}>
                                {war.description}
                              </p>
                              <p className="text-orange-400 font-bold mt-1">Impact: {war.marketImpact}</p>
                            </div>
                          )}

                          {wave && showWaves && (
                            <div className="mt-2 pt-2 border-t border-slate-600">
                              <Badge
                                variant="secondary"
                                className="mb-1"
                                style={{ backgroundColor: elliotWaveDegrees.find((d) => d.id === wave.degree)?.color }}
                              >
                                🌊 {elliotWaveDegrees.find((d) => d.id === wave.degree)?.symbol} {wave.wave}
                              </Badge>
                              <p className={`text-sm ${currentTheme.textSecondary}`}>{wave.title}</p>
                            </div>
                          )}

                          {userWave && (
                            <div className="mt-2 pt-2 border-t border-slate-600">
                              <Badge variant="outline" className="mb-1 bg-purple-600">
                                👤 {elliotWaveDegrees.find((d) => d.id === userWave.degree)?.symbol} {userWave.wave}
                              </Badge>
                              <p className={`text-sm ${currentTheme.textSecondary}`}>User Placed Wave</p>
                            </div>
                          )}
                        </div>
                      )
                    }
                    return null
                  }}
                />

                {/* Candlestick bars */}
                <Bar
                  dataKey={isLogarithmic ? "logClose" : "close"}
                  fill={currentTheme.candlestick.up}
                  shape={renderCandlestick}
                />

                {/* Wave lijnen */}
                {showWaves &&
                  showWaveLines &&
                  waveLines.map((line, lineIndex) => (
                    <Line
                      key={`wave-line-${lineIndex}`}
                      type="linear"
                      dataKey="logY"
                      data={line.points}
                      stroke={line.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={false}
                      isAnimationActive={false}
                      connectNulls={true}
                    />
                  ))}

                {/* Wave punten */}
                {showWaves &&
                  allElliottWaves.map((wave, index) => {
                    if (!visibleDegrees.includes(wave.degree)) return null

                    const dataPoint = filteredData.find(
                      (d) => d.year === wave.year || (d.date && wave.date && d.date === wave.date),
                    )
                    if (!dataPoint) return null

                    const degreeInfo = elliotWaveDegrees.find((d) => d.id === wave.degree)
                    if (!degreeInfo) return null

                    return (
                      <Scatter
                        key={`wave-point-${index}`}
                        name={`${degreeInfo.symbol} ${wave.wave}`}
                        data={[
                          {
                            x: dataPoint.year || new Date(dataPoint.date).getFullYear(),
                            y: isLogarithmic ? Math.log10(dataPoint.close) : dataPoint.close,
                            z: 100,
                          },
                        ]}
                        fill={degreeInfo.color}
                        shape={(props) => {
                          const { cx, cy } = props
                          return <circle cx={cx} cy={cy} r={6} fill={degreeInfo.color} stroke="#fff" strokeWidth={2} />
                        }}
                      />
                    )
                  })}

                {/* User wave punten */}
                {showWaves &&
                  userWaves.map((wave, index) => {
                    const dataPoint = filteredData.find(
                      (d) => d.year === wave.year || (d.date && wave.date && d.date === wave.date),
                    )
                    if (!dataPoint) return null

                    const degreeInfo = elliotWaveDegrees.find((d) => d.id === wave.degree)
                    if (!degreeInfo) return null

                    return (
                      <Scatter
                        key={`user-wave-point-${index}`}
                        name={`User ${degreeInfo.symbol} ${wave.wave}`}
                        data={[
                          {
                            x: dataPoint.year || new Date(dataPoint.date).getFullYear(),
                            y: isLogarithmic ? Math.log10(dataPoint.close) : dataPoint.close,
                            z: 100,
                          },
                        ]}
                        fill="#9333ea"
                        shape={(props) => {
                          const { cx, cy } = props
                          return <circle cx={cx} cy={cy} r={6} fill="#9333ea" stroke="#fff" strokeWidth={2} />
                        }}
                      />
                    )
                  })}

                {/* Crash reference lines */}
                {showCrashes &&
                  allCrashes.map((crash, index) => (
                    <ReferenceLine
                      key={`crash-${index}`}
                      x={crash.year}
                      stroke={currentTheme.crashes}
                      strokeWidth={3}
                      strokeDasharray="8 4"
                      label={{
                        value: `💥 ${crash.name}`,
                        position: "top",
                        className: "text-xs font-bold",
                        style: { fill: currentTheme.crashes },
                      }}
                    />
                  ))}

                {/* War reference lines */}
                {showWars &&
                  warsAndMarkets.map((war, index) => (
                    <ReferenceLine
                      key={`war-${index}`}
                      x={war.year}
                      stroke="#f97316"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      label={{
                        value: `⚔️ ${war.name}`,
                        position: "bottom",
                        className: "text-xs font-bold",
                        style: { fill: "#f97316" },
                      }}
                    />
                  ))}

                {/* Fibonacci reference lines */}
                {showFibonacci && fibLevels && (
                  <>
                    {/* Retracement levels */}
                    {fibLevels.retracementLevels.map((level, index) => (
                      <ReferenceLine
                        key={`fib-ret-${index}`}
                        y={isLogarithmic ? level.logPrice : level.price}
                        stroke="#fbbf24"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        label={{
                          value: `${level.percentage} (${Math.round(level.price)})`,
                          position: "right",
                          className: "text-xs",
                          style: { fill: "#fbbf24" },
                        }}
                      />
                    ))}

                    {/* Extension levels */}
                    {fibLevels.extensionLevels.slice(1).map((level, index) => (
                      <ReferenceLine
                        key={`fib-ext-${index}`}
                        y={isLogarithmic ? level.logPrice : level.price}
                        stroke="#60a5fa"
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        label={{
                          value: `${level.percentage} (${Math.round(level.price)})`,
                          position: "right",
                          className: "text-xs",
                          style: { fill: "#60a5fa" },
                        }}
                      />
                    ))}

                    {/* Start en end punten */}
                    <ReferenceLine
                      x={fibLevels.start.year}
                      stroke="#10b981"
                      strokeWidth={2}
                      label={{
                        value: `Start: ${fibLevels.start.price.toLocaleString()}`,
                        position: "topLeft",
                        className: "text-xs font-bold",
                        style: { fill: "#10b981" },
                      }}
                    />
                    <ReferenceLine
                      x={fibLevels.end.year}
                      stroke="#ef4444"
                      strokeWidth={2}
                      label={{
                        value: `End: ${fibLevels.end.price.toLocaleString()}`,
                        position: "topRight",
                        className: "text-xs font-bold",
                        style: { fill: "#ef4444" },
                      }}
                    />
                  </>
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
