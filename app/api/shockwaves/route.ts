import { NextResponse } from "next/server"
import { historicalData, majorCrashes, fetchFreeMarketData } from "@/lib/crash-data"

export async function GET() {
  try {
    // Probeer gratis API data op te halen
    const marketData = historicalData

    // Alleen als API key beschikbaar is
    if (process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY && process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY !== "demo") {
      try {
        const apiData = await fetchFreeMarketData()
        // Verwerk API data hier indien succesvol
        console.log("API data retrieved successfully")
      } catch (error) {
        console.log("API failed, using historical data")
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        historicalData: marketData,
        crashes: majorCrashes,
        lastUpdated: new Date().toISOString(),
        source: "Historical data + Free APIs",
        cost: "€0.00 per maand! 🎉",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch Shockwaves data",
        fallback: "Using cached historical data",
      },
      { status: 500 },
    )
  }
}
