"use client"

import { useState, useEffect } from "react"
import { majorCrashes, elliotWaves, elliotWaveDegrees } from "@/lib/crash-data"
import { combinedMarketData } from "@/lib/detailed-market-data"
import { historicalDjiaData } from "@/lib/historical-djia-data"

interface ShockwavesData {
  historicalData: typeof combinedMarketData
  crashes: typeof majorCrashes
  elliotWaves: typeof elliotWaves
  elliotWaveDegrees: typeof elliotWaveDegrees
  lastUpdated: string
  source: string
  cost: string
  apiStatus?: string
  dataPoints?: number
  apiError?: string | null
  meta?: {
    hasApiKey: boolean
    usingMockData: boolean
    usingHistoricalOnly: boolean
    rateLimited?: boolean
  }
}

export function useShockwavesData() {
  const [data, setData] = useState<ShockwavesData>({
    historicalData: historicalDjiaData, // Gebruik echte historische data
    crashes: majorCrashes,
    elliotWaves,
    elliotWaveDegrees,
    lastUpdated: new Date().toISOString(),
    source: "Historical DJIA data (1896-2024)",
    cost: "€0.00",
    apiStatus: "loading",
    dataPoints: historicalDjiaData.length,
    apiError: null,
    meta: {
      hasApiKey: false,
      usingMockData: false,
      usingHistoricalOnly: true,
    },
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        console.log("🔄 Fetching shockwaves data...")
        const response = await fetch("/api/shockwaves")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log("📊 Shockwaves data received:", result.data?.source)

        if (result.success && result.data) {
          setData(result.data)
          console.log("✅ Data successfully loaded:", result.data.source)

          // Log rate limit status
          if (result.data.meta?.rateLimited) {
            console.log("⚠️ API rate limited - using enhanced mock data")
          }
        } else {
          // Zelfs als success false is, probeer de data te gebruiken
          if (result.data) {
            setData(result.data)
            setError(`API warning: ${result.error || "Unknown issue"} - Using fallback data`)
            console.log("⚠️ Using fallback data due to API issues")
          } else {
            throw new Error(result.error || "No data received from API")
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        console.error("❌ Shockwaves data fetch error:", err)

        // Gebruik lokale data als laatste fallback
        setData({
          historicalData: combinedMarketData,
          crashes: majorCrashes,
          elliotWaves,
          elliotWaveDegrees,
          lastUpdated: new Date().toISOString(),
          source: "Local data (error fallback)",
          cost: "€0.00",
          apiStatus: "error",
          dataPoints: combinedMarketData.length,
          apiError: errorMessage,
          meta: {
            hasApiKey: false,
            usingMockData: false,
            usingHistoricalOnly: true,
          },
        })
        console.log("🔄 Using local data as final fallback")

        // Don't set error state for rate limits or expected failures
        if (!errorMessage.includes("rate limit")) {
          setError(`Failed to fetch data: ${errorMessage}`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: () => {
      setError(null)
      window.location.reload()
    },
  }
}
