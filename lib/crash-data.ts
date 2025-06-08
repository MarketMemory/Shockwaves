// OHLC Candlestick data voor professionele charts
export const candlestickData = [
  // 1920s - De Roaring Twenties en de Crash
  { year: 1920, date: "1920-01-01", open: 68, high: 75, low: 65, close: 71, volume: 1200000 },
  { year: 1925, date: "1925-01-01", open: 145, high: 165, low: 140, close: 156, volume: 1800000 },
  { year: 1929, date: "1929-09-01", open: 350, high: 381, low: 340, close: 381, volume: 8500000 }, // Piek voor crash
  { year: 1930, date: "1930-01-01", open: 380, high: 200, low: 160, close: 165, volume: 12000000 }, // Crash jaar
  { year: 1932, date: "1932-07-01", open: 50, high: 55, low: 35, close: 41, volume: 3200000 }, // Dieptepunt

  // Herstel en WOII
  { year: 1940, date: "1940-01-01", open: 125, high: 140, low: 120, close: 131, volume: 2100000 },
  { year: 1945, date: "1945-01-01", open: 185, high: 200, low: 180, close: 192, volume: 2800000 },
  { year: 1950, date: "1950-01-01", open: 220, high: 245, low: 215, close: 235, volume: 3100000 },

  // Naoorlogse groei
  { year: 1960, date: "1960-01-01", open: 600, high: 635, low: 590, close: 618, volume: 4200000 },
  { year: 1970, date: "1970-01-01", open: 820, high: 860, low: 800, close: 839, volume: 5800000 },
  { year: 1980, date: "1980-01-01", open: 940, high: 985, low: 920, close: 964, volume: 7200000 },

  // 1987 Zwarte Maandag
  { year: 1987, date: "1987-10-01", open: 2500, high: 2600, low: 1500, close: 1939, volume: 25000000 },
  { year: 1988, date: "1988-01-01", open: 1950, high: 2200, low: 1900, close: 2169, volume: 8900000 },

  // Dot-com bubble
  { year: 1995, date: "1995-01-01", open: 4900, high: 5200, low: 4800, close: 5117, volume: 12000000 },
  { year: 2000, date: "2000-03-01", open: 10200, high: 11750, low: 9800, close: 10787, volume: 45000000 },
  { year: 2001, date: "2001-09-01", open: 9500, high: 9600, low: 7800, close: 8342, volume: 35000000 },
  { year: 2002, date: "2002-10-01", open: 8000, high: 8200, low: 7100, close: 7286, volume: 28000000 },

  // Herstel en 2008 crisis
  { year: 2005, date: "2005-01-01", open: 10400, high: 10800, low: 10200, close: 10718, volume: 18000000 },
  { year: 2007, date: "2007-10-01", open: 13000, high: 14200, low: 12800, close: 13264, volume: 22000000 },
  { year: 2008, date: "2008-03-01", open: 12500, high: 13000, low: 6200, close: 6547, volume: 85000000 },
  { year: 2009, date: "2009-03-01", open: 6800, high: 9200, low: 6400, close: 8776, volume: 42000000 },

  // Moderne tijden
  { year: 2015, date: "2015-01-01", open: 17000, high: 17600, low: 16800, close: 17425, volume: 28000000 },
  { year: 2020, date: "2020-03-01", open: 28000, high: 29500, low: 18500, close: 18592, volume: 125000000 },
  { year: 2021, date: "2021-11-01", open: 26000, high: 36400, low: 25800, close: 28538, volume: 95000000 },
  { year: 2024, date: "2024-01-01", open: 33500, high: 37200, low: 32800, close: 34721, volume: 45000000 },

  // Toekomst projectie
  { year: 2026, date: "2026-01-01", open: 30000, high: 32000, low: 22000, close: 25000, volume: 60000000 },
]

// Elliott Wave Degrees (van groot naar klein)
export const elliotWaveDegrees = [
  { id: "grand-supercycle", name: "Grand Supercycle", symbol: "GSC", color: "#ffd700", duration: "150-200 jaar" },
  { id: "supercycle", name: "Supercycle", symbol: "SC", color: "#ff6b35", duration: "40-70 jaar" },
  { id: "cycle", name: "Cycle", symbol: "C", color: "#f7931e", duration: "1-10 jaar" },
  { id: "primary", name: "Primary", symbol: "P", color: "#00d4ff", duration: "Maanden-jaren" },
  { id: "intermediate", name: "Intermediate", symbol: "I", color: "#0099cc", duration: "Weken-maanden" },
  { id: "minor", name: "Minor", symbol: "M", color: "#7b68ee", duration: "Dagen-weken" },
]

// Elliott Wave annotaties
export const elliotWaves = [
  {
    year: 1932,
    date: "1932-07-08",
    degree: "grand-supercycle",
    wave: "IV",
    type: "trough",
    title: "Grand Supercycle Wave IV Bottom",
    description:
      "Einde van Grand Supercycle Wave IV - Grote Depressie dieptepunt. Begin van nieuwe Grand Supercycle Wave V.",
    confidence: "high",
  },
  {
    year: 1966,
    date: "1966-02-09",
    degree: "supercycle",
    wave: "I",
    type: "peak",
    title: "Supercycle Wave I Peak",
    description: "Einde van Supercycle Wave I van de Grand Supercycle Wave V. Begin van correctie.",
    confidence: "medium",
  },
  {
    year: 1974,
    date: "1974-12-06",
    degree: "supercycle",
    wave: "II",
    type: "trough",
    title: "Supercycle Wave II Bottom",
    description: "Einde van Supercycle Wave II correctie. Begin van krachtige Supercycle Wave III.",
    confidence: "high",
  },
  {
    year: 2000,
    date: "2000-01-14",
    degree: "supercycle",
    wave: "III",
    type: "peak",
    title: "Supercycle Wave III Peak",
    description: "Mogelijke top van Supercycle Wave III. Dot-com bubble piek. Begin van Wave IV correctie?",
    confidence: "medium",
  },
  {
    year: 2009,
    date: "2009-03-09",
    degree: "cycle",
    wave: "A",
    type: "trough",
    title: "Cycle Wave A Bottom",
    description: "Financiële crisis dieptepunt. Mogelijk einde van Cycle Wave A binnen Supercycle Wave IV.",
    confidence: "medium",
  },
  {
    year: 2021,
    date: "2021-11-08",
    degree: "primary",
    wave: "5",
    type: "peak",
    title: "Primary Wave 5 Peak",
    description: "COVID herstel piek. Mogelijk einde van Primary Wave 5 binnen grotere structuur.",
    confidence: "low",
  },
  {
    year: 2026,
    date: "2026-01-01",
    degree: "supercycle",
    wave: "IV",
    type: "projection",
    title: "Supercycle Wave IV Projection",
    description:
      "Mogelijke voltooiing van Supercycle Wave IV correctie. Historische cyclus suggereert grote correctie.",
    confidence: "projection",
  },
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

// Backward compatibility
export const historicalData = candlestickData.map((item) => ({
  year: item.year,
  value: item.close,
}))
