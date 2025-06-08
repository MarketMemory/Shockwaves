import { NextResponse } from "next/server"
import { majorCrashes } from "@/lib/crash-data"
import { fetchAlphaVantageData, processAlphaVantageData } from "@/lib/server-api"
import { elliotWaves, elliotWaveDegrees } from "@/lib/crash-data"
import { historicalDjiaData } from "@/lib/historical-djia-data"

export async function GET() {
  // Start altijd met echte historische data
  let marketData = [...historicalDjiaData]
  let dataSource = "Historical DJIA data (1896-2024)"
  let apiStatus = "historical-only"
  let apiError = null
  let liveDataInfo = null

  console.log(`🚀 Starting with ${historicalDjiaData.length} historical DJIA data points`)

  // Probeer Alpha Vantage alleen voor recente data (optioneel)
  if (process.env.ALPHA_VANTAGE_KEY && process.env.ALPHA_VANTAGE_KEY !== "demo") {
    console.log("🔄 Attempting to fetch recent data from Alpha Vantage...")
    apiStatus = "attempting-alphavantage"

    const alphaVantageResult = await fetchAlphaVantageData()

    if (alphaVantageResult.success && alphaVantageResult.data) {
      try {
        const recentData = await processAlphaVantageData(alphaVantageResult.data)
        // Filter alleen data vanaf 2024 om duplicaten te voorkomen
        const recentFiltered = recentData.filter((item) => item.year >= 2024)

        if (recentFiltered.length > 0) {
          marketData = [...historicalDjiaData, ...recentFiltered]
          dataSource = "Historical DJIA (1896-2024) + Live DIA ETF data"
          apiStatus = "success-alphavantage"
          liveDataInfo = {
            symbol: alphaVantageResult.data._originalSymbol || "DIA",
            description: "Recent market data via Alpha Vantage",
            scaling: alphaVantageResult.data._scalingFactor > 1 ? "Scaled to DJIA level" : "No scaling",
            accuracy: "Live data supplement",
          }
          console.log(`✅ Added ${recentFiltered.length} recent data points`)
        } else {
          console.log("ℹ️ No recent data to add, using historical data only")
          apiStatus = "historical-only"
        }
      } catch (processingError) {
        console.log("⚠️ Error processing Alpha Vantage data, continuing with historical data")
        apiError = processingError instanceof Error ? processingError.message : "Data processing failed"
        apiStatus = "historical-only"
      }
    } else {
      // Alpha Vantage failed - dat is oké, we hebben historische data
      if (alphaVantageResult.isRateLimit) {
        console.log("⚠️ Alpha Vantage rate limited - using historical data only")
        apiStatus = "rate-limited"
        apiError = "API rate limit reached"
      } else {
        console.log("⚠️ Alpha Vantage failed - using historical data only")
        apiStatus = "historical-only"
        apiError = alphaVantageResult.error
      }
    }
  } else {
    console.log("ℹ️ No Alpha Vantage API key configured")
    apiStatus = "no-api-key"
  }

  const response = {
    success: true,
    data: {
      historicalData: marketData,
      crashes: majorCrashes,
      elliotWaves,
      elliotWaveDegrees,
      lastUpdated: new Date().toISOString(),
      source: dataSource,
      apiStatus: apiStatus,
      apiError: apiError,
      liveDataInfo: liveDataInfo,
      cost: "€0.00 per maand! 🎉",
      dataPoints: marketData.length,
    },
    meta: {
      hasApiKey: !!(process.env.ALPHA_VANTAGE_KEY && process.env.ALPHA_VANTAGE_KEY !== "demo"),
      usingMockData: false, // We gebruiken nooit meer mock data
      usingHistoricalOnly: apiStatus !== "success-alphavantage",
      usingDiaEtf: liveDataInfo?.symbol === "DIA",
      rateLimited: apiStatus === "rate-limited",
    },
  }

  console.log(`📊 API response:`, {
    dataPoints: marketData.length,
    source: dataSource,
    status: apiStatus,
    hasRecentData: apiStatus === "success-alphavantage",
  })

  return NextResponse.json(response)
}
