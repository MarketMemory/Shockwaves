// Server-side API functies (alleen voor API routes)

// Nieuwe interface voor API resultaten
interface ApiResult {
  success: boolean
  data?: any
  error?: string
  isRateLimit?: boolean
  fallbackReason?: string
}

export async function fetchAlphaVantageData(): Promise<ApiResult> {
  // Gebruik gewone environment variable (zonder NEXT_PUBLIC_)
  const API_KEY = process.env.ALPHA_VANTAGE_KEY || "demo"

  if (API_KEY === "demo") {
    console.log("⚠️ No Alpha Vantage API key configured, using demo mode")
    return {
      success: false,
      error: "No API key configured",
      fallbackReason: "no-api-key",
    }
  }

  try {
    // Gebruik DIA ETF als proxy voor DJIA - volgt de index bijna 1-op-1
    // DIA is veel betrouwbaarder beschikbaar in Alpha Vantage dan directe DJIA symbolen
    const symbols = ["DIA", "SPY", "QQQ"] // DIA = DJIA ETF, SPY/QQQ als fallbacks
    let lastError = null

    for (const symbol of symbols) {
      try {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=compact`
        console.log(`🔄 Fetching from Alpha Vantage API with symbol: ${symbol}`)

        const response = await fetch(url, {
          next: { revalidate: 3600 }, // Cache voor 1 uur
          headers: {
            "User-Agent": "Shockwaves-App/1.0",
          },
        })

        if (!response.ok) {
          lastError = `API request failed with status: ${response.status}`
          continue
        }

        const data = await response.json()
        console.log("📊 Alpha Vantage response keys:", Object.keys(data))

        // Check for various error conditions
        if (data["Error Message"]) {
          console.log(`❌ API error for symbol ${symbol}:`, data["Error Message"])
          lastError = "API error: " + data["Error Message"]
          continue // Try next symbol
        }

        if (data["Note"]) {
          console.log(`⚠️ API rate limit for symbol ${symbol}:`, data["Note"])
          return {
            success: false,
            error: "API rate limit exceeded",
            isRateLimit: true,
            fallbackReason: "rate-limit",
          }
        }

        if (data["Information"]) {
          console.log(`ℹ️ API info for symbol ${symbol}:`, data["Information"])
          // Check if this is a rate limit message
          if (data["Information"].includes("rate limit") || data["Information"].includes("25 requests")) {
            return {
              success: false,
              error: "API rate limit exceeded (25 requests per day)",
              isRateLimit: true,
              fallbackReason: "rate-limit",
            }
          }
          lastError = "API info: " + data["Information"]
          continue // Try next symbol
        }

        // Check if we have the expected data structure
        if (data["Time Series (Daily)"]) {
          console.log(`✅ Found Time Series data for symbol: ${symbol}`)

          // Voor DIA ETF, schaal de prijzen op naar DJIA niveau (DIA ≈ DJIA/100)
          if (symbol === "DIA") {
            console.log("📈 Scaling DIA ETF prices to DJIA equivalent...")
            data._originalSymbol = symbol
            data._scalingFactor = 100 // DIA is ongeveer DJIA/100
            data._description = "DIA ETF (scaled to DJIA equivalent)"
          } else {
            data._originalSymbol = symbol
            data._scalingFactor = 1
            data._description = `${symbol} (fallback for DJIA)`
          }

          return {
            success: true,
            data: data,
          }
        } else {
          console.log(`❌ No Time Series data for symbol ${symbol}, available keys:`, Object.keys(data))
          lastError = `Invalid API response format for ${symbol} - missing Time Series data`
          continue // Try next symbol
        }
      } catch (error) {
        console.log(`❌ Error with symbol ${symbol}:`, error)
        lastError = error instanceof Error ? error.message : "Unknown error"
        continue // Try next symbol
      }
    }

    // If we get here, all symbols failed
    return {
      success: false,
      error: lastError || "All symbols failed",
      fallbackReason: "api-failed",
    }
  } catch (error) {
    console.error("❌ Alpha Vantage API error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      fallbackReason: "api-error",
    }
  }
}

export async function processAlphaVantageData(apiData: any) {
  try {
    const timeSeries = apiData["Time Series (Daily)"]
    const scalingFactor = apiData._scalingFactor || 1
    const originalSymbol = apiData._originalSymbol || "Unknown"
    const description = apiData._description || "Unknown source"

    if (!timeSeries || typeof timeSeries !== "object") {
      throw new Error("Invalid time series data format")
    }

    const entries = Object.entries(timeSeries)

    if (entries.length === 0) {
      throw new Error("No time series data available")
    }

    console.log(`📈 Processing ${entries.length} data points from ${originalSymbol} (${description})`)
    console.log(`📊 Scaling factor: ${scalingFactor}x`)

    // Converteer API data naar ons formaat
    const processedData = entries
      .slice(0, 100) // Laatste 100 dagen
      .map(([date, data]: [string, any]) => {
        // Valideer data structure
        if (!data || typeof data !== "object") {
          console.warn(`⚠️ Invalid data for date ${date}:`, data)
          return null
        }

        const open = data["1. open"]
        const high = data["2. high"]
        const low = data["3. low"]
        const close = data["4. close"]
        const volume = data["5. volume"]

        // Valideer dat alle vereiste velden aanwezig zijn
        if (!open || !high || !low || !close || !volume) {
          console.warn(`⚠️ Missing data fields for date ${date}:`, data)
          return null
        }

        // Schaal de prijzen naar DJIA niveau (voor DIA ETF)
        const openValue = Number.parseFloat(open)
        const highValue = Number.parseFloat(high)
        const lowValue = Number.parseFloat(low)
        const closeValue = Number.parseFloat(close)
        const volumeValue = Number.parseInt(volume)

        // Voor DIA ETF: controleer of schaling nodig is
        // DIA handelt normaal tussen $300-$500, DJIA tussen 30000-50000
        let effectiveScalingFactor = 1

        if (originalSymbol === "DIA") {
          // Als DIA waarde onder 1000 is, dan schalen we naar DJIA niveau
          if (closeValue < 1000) {
            effectiveScalingFactor = 100 // DIA * 100 ≈ DJIA
          }
        }

        return {
          year: new Date(date).getFullYear(),
          date: date,
          open: Math.round(openValue * effectiveScalingFactor),
          high: Math.round(highValue * effectiveScalingFactor),
          low: Math.round(lowValue * effectiveScalingFactor),
          close: Math.round(closeValue * effectiveScalingFactor),
          volume: volumeValue,
          _source: originalSymbol,
          _scaled: effectiveScalingFactor > 1,
        }
      })
      .filter((item) => item !== null) // Filter out invalid entries
      .reverse() // Chronologische volgorde

    console.log(`✅ Successfully processed ${processedData.length} valid data points from ${originalSymbol}`)

    if (processedData.length > 0) {
      const latestData = processedData[processedData.length - 1]
      console.log(`📊 Latest ${originalSymbol} data: $${latestData.close.toLocaleString()} (${latestData.date})`)
    }

    if (processedData.length === 0) {
      throw new Error("No valid data points after processing")
    }

    return processedData
  } catch (error) {
    console.error("❌ Error processing Alpha Vantage data:", error)
    throw error
  }
}

// Fallback functie voor wanneer API faalt
export function generateMockRealtimeData() {
  console.log("🎭 Generating enhanced mock real-time data...")
  const baseValue = 44000 // Huidig DJIA niveau (december 2024)
  const mockData = []
  const now = new Date()

  // Genereer 60 dagen mock data voor betere visualisatie
  for (let i = 60; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Meer realistische variatie gebaseerd op markttrends
    const trendFactor = Math.sin((i / 60) * Math.PI * 2) * 0.02 // Kleinere cyclische trend
    const randomVariation = (Math.random() - 0.5) * 500 // Dagelijkse variatie
    const volatility = 1 + Math.random() * 0.3 // Variabele volatiliteit

    const open = baseValue + trendFactor * baseValue + randomVariation
    const close = open + (Math.random() - 0.5) * 300 * volatility
    const high = Math.max(open, close) + Math.random() * 100 * volatility
    const low = Math.min(open, close) - Math.random() * 100 * volatility

    mockData.push({
      year: date.getFullYear(),
      date: date.toISOString().split("T")[0],
      open: Math.round(Math.max(1000, open)), // Zorg dat prijzen realistisch blijven
      high: Math.round(Math.max(1000, high)),
      low: Math.round(Math.max(1000, low)),
      close: Math.round(Math.max(1000, close)),
      volume: Math.round(2000000 + Math.random() * 3000000), // Realistisch volume
      _source: "mock",
      _scaled: false,
    })
  }

  console.log(`✅ Generated ${mockData.length} enhanced mock DJIA-level data points`)
  return mockData
}

// Alternatieve API functie voor Yahoo Finance (gratis fallback)
export async function fetchYahooFinanceData(): Promise<ApiResult> {
  try {
    console.log("🔄 Attempting Yahoo Finance fallback...")
    // Dit is een eenvoudige fallback - in productie zou je een echte Yahoo Finance API gebruiken
    return {
      success: false,
      error: "Yahoo Finance integration not implemented yet",
      fallbackReason: "not-implemented",
    }
  } catch (error) {
    console.log("❌ Yahoo Finance fallback failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      fallbackReason: "yahoo-error",
    }
  }
}
