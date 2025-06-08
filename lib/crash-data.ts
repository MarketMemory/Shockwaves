// Historische DJI data met focus op grote crashes
export const historicalData = [
  // 1920s - De Roaring Twenties en de Crash
  { year: 1920, value: 71 },
  { year: 1925, value: 156 },
  { year: 1929, value: 381 }, // Piek voor de crash
  { year: 1930, value: 165 }, // Na Zwarte Dinsdag
  { year: 1932, value: 41 }, // Dieptepunt van de Depressie

  // Herstel en WOII
  { year: 1940, value: 131 },
  { year: 1945, value: 192 },
  { year: 1950, value: 235 },

  // Naoorlogse groei
  { year: 1960, value: 618 },
  { year: 1970, value: 839 },
  { year: 1980, value: 964 },

  // 1987 Zwarte Maandag
  { year: 1987, value: 1939 }, // Voor de crash
  { year: 1988, value: 2169 }, // Na herstel

  // Dot-com bubble
  { year: 1995, value: 5117 },
  { year: 2000, value: 10787 }, // Piek van dot-com
  { year: 2001, value: 8342 }, // Na 9/11
  { year: 2002, value: 7286 }, // Dieptepunt

  // Herstel en 2008 crisis
  { year: 2005, value: 10718 },
  { year: 2007, value: 13264 }, // Voor 2008 crisis
  { year: 2008, value: 6547 }, // Financiële crisis dieptepunt
  { year: 2009, value: 8776 }, // Begin herstel

  // Moderne tijden
  { year: 2015, value: 17425 },
  { year: 2020, value: 18592 }, // Voor COVID
  { year: 2021, value: 28538 }, // COVID herstel
  { year: 2024, value: 34721 }, // Huidige waarde

  // Toekomst projectie
  { year: 2026, value: 25000 }, // Mogelijke volgende crash?
]

// Grote crashes en hun details
export const majorCrashes = [
  {
    year: 1929,
    name: "Zwarte Dinsdag",
    description:
      "De grootste beurscrash in de geschiedenis. Op 29 oktober 1929 stortte de markt volledig in, wat leidde tot de Grote Depressie die 10 jaar zou duren.",
    impact: "-89% (1929-1932)",
    severity: "extreme",
    duration: "3 jaar",
    recovery: "25 jaar",
  },
  {
    year: 1987,
    name: "Zwarte Maandag",
    description:
      "Op 19 oktober 1987 daalde de Dow Jones met 22.6% op één dag - de grootste eendaagse daling ooit. Computerhandel en programmahandel werden als oorzaken aangewezen.",
    impact: "-22.6% (1 dag)",
    severity: "major",
    duration: "1 dag",
    recovery: "2 jaar",
  },
  {
    year: 2001,
    name: "Dot-com Crash + 9/11",
    description:
      "De internetbubbel barstte en werd verergerd door de terroristische aanslagen van 11 september. Technologieaandelen verloren 78% van hun waarde.",
    impact: "-37% (2000-2002)",
    severity: "major",
    duration: "2 jaar",
    recovery: "5 jaar",
  },
  {
    year: 2008,
    name: "Financiële Crisis",
    description:
      "De subprime hypotheekcrisis leidde tot de grootste financiële crisis sinds de Grote Depressie. Lehman Brothers viel om, banken werden gered door overheden.",
    impact: "-54% (2007-2009)",
    severity: "extreme",
    duration: "1.5 jaar",
    recovery: "6 jaar",
  },
  {
    year: 2020,
    name: "COVID-19 Crash",
    description:
      "De pandemie zorgde voor een snelle maar korte crash. Ongekende stimulusmaatregelen zorgden voor het snelste herstel ooit.",
    impact: "-37% (1 maand)",
    severity: "major",
    duration: "1 maand",
    recovery: "6 maanden",
  },
  {
    year: 2026,
    name: "Volgende Crisis?",
    description:
      "Historisch gezien volgen grote crashes elkaar op met intervallen van 7-20 jaar. Mogelijke triggers: schuldencrisis, geopolitieke spanningen, of technologische disruptie.",
    impact: "Onbekend",
    severity: "unknown",
    duration: "?",
    recovery: "?",
  },
]

// Gratis API integratie functies
export async function fetchFreeMarketData() {
  // Alpha Vantage gratis tier: 5 calls per minuut, 500 per dag
  const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY || "demo"

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DJI&apikey=${API_KEY}`,
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Using fallback historical data")
    return { historicalData }
  }
}

// Yahoo Finance alternatief (gratis maar minder betrouwbaar)
export async function fetchYahooFinanceData() {
  try {
    // Yahoo Finance heeft geen officiële API meer, maar er zijn workarounds
    // Voor nu gebruiken we onze historische data
    return { historicalData }
  } catch (error) {
    return { historicalData }
  }
}
