// Fibonacci retracement en extension levels
export const fibonacciLevels = {
  retracement: [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0],
  extension: [1.0, 1.272, 1.414, 1.618, 2.0, 2.618, 3.618, 4.236],
}

// Bereken Fibonacci levels tussen twee punten
export function calculateFibonacciLevels(
  startPrice: number,
  endPrice: number,
  isLogarithmic = true,
  type: "retracement" | "extension" = "retracement",
) {
  const levels = type === "retracement" ? fibonacciLevels.retracement : fibonacciLevels.extension

  if (isLogarithmic) {
    // Voor logaritmische schaal, gebruik log van prijzen
    const logStart = Math.log10(startPrice)
    const logEnd = Math.log10(endPrice)
    const logDiff = logEnd - logStart

    return levels.map((level) => {
      const logLevel =
        type === "retracement"
          ? logEnd - logDiff * level // Retracement gaat terug van end naar start
          : logStart + logDiff * level // Extension gaat verder van start

      return {
        level,
        price: Math.pow(10, logLevel),
        logPrice: logLevel,
        percentage: (level * 100).toFixed(1) + "%",
      }
    })
  } else {
    // Voor lineaire schaal, gebruik gewone prijzen
    const priceDiff = endPrice - startPrice

    return levels.map((level) => {
      const price = type === "retracement" ? endPrice - priceDiff * level : startPrice + priceDiff * level

      return {
        level,
        price,
        logPrice: Math.log10(price),
        percentage: (level * 100).toFixed(1) + "%",
      }
    })
  }
}

// Belangrijke Fibonacci punten in de DJIA geschiedenis
export const historicalFibonacciPoints = [
  // Grote Depressie cycle
  {
    id: "great-depression",
    name: "Grote Depressie Cycle",
    start: { year: 1929, price: 381, date: "1929-09-03" },
    end: { year: 1932, price: 41, date: "1932-07-08" },
    type: "crash" as const,
    description: "Van piek naar dieptepunt van de Grote Depressie",
  },

  // Post-war boom
  {
    id: "post-war-boom",
    name: "Naoorlogse Boom",
    start: { year: 1932, price: 41, date: "1932-07-08" },
    end: { year: 1966, price: 995, date: "1966-02-09" },
    type: "bull" as const,
    description: "Supercycle Wave I - Van depressie naar naoorlogse piek",
  },

  // 1970s bear market
  {
    id: "seventies-bear",
    name: "1970s Bear Market",
    start: { year: 1966, price: 995, date: "1966-02-09" },
    end: { year: 1974, price: 577, date: "1974-12-06" },
    type: "crash" as const,
    description: "Supercycle Wave II correctie",
  },

  // Great bull market
  {
    id: "great-bull",
    name: "Grote Bull Market",
    start: { year: 1974, price: 577, date: "1974-12-06" },
    end: { year: 2000, price: 11750, date: "2000-01-14" },
    type: "bull" as const,
    description: "Supercycle Wave III - De grootste bull market ooit",
  },

  // Dot-com crash
  {
    id: "dotcom-crash",
    name: "Dot-com Crash",
    start: { year: 2000, price: 11750, date: "2000-01-14" },
    end: { year: 2002, price: 7286, date: "2002-10-09" },
    type: "crash" as const,
    description: "Begin van Supercycle Wave IV correctie",
  },

  // Financial crisis
  {
    id: "financial-crisis",
    name: "Financiële Crisis",
    start: { year: 2007, price: 14198, date: "2007-10-09" },
    end: { year: 2009, price: 6547, date: "2009-03-09" },
    type: "crash" as const,
    description: "Diepste punt van Supercycle Wave IV",
  },

  // Post-crisis recovery
  {
    id: "post-crisis-recovery",
    name: "Post-Crisis Herstel",
    start: { year: 2009, price: 6547, date: "2009-03-09" },
    end: { year: 2021, price: 36585, date: "2021-11-08" },
    type: "bull" as const,
    description: "Mogelijk einde van Supercycle Wave IV, begin Wave V?",
  },
]

// Bereken alle Fibonacci levels voor historische punten
export function getAllHistoricalFibLevels(isLogarithmic = true) {
  return historicalFibonacciPoints.map((point) => ({
    ...point,
    retracementLevels: calculateFibonacciLevels(point.start.price, point.end.price, isLogarithmic, "retracement"),
    extensionLevels: calculateFibonacciLevels(point.start.price, point.end.price, isLogarithmic, "extension"),
  }))
}
