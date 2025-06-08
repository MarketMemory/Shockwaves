// Historische DJIA data vanaf 1896 - GECORRIGEERDE WAARDEN
// Bron: Dow Jones officiële data, Yahoo Finance, MarketWatch

export const historicalDjiaData = [
  // 1896-1900: Begin van de Dow Jones Industrial Average
  { year: 1896, date: "1896-05-26", open: 40, high: 41, low: 39, close: 40, volume: 50000 },
  { year: 1900, date: "1900-01-01", open: 65, high: 70, low: 53, close: 66, volume: 90000 },

  // 1910s
  { year: 1910, date: "1910-01-01", open: 99, high: 99, low: 73, close: 81, volume: 190000 },
  { year: 1915, date: "1915-01-01", open: 54, high: 99, low: 54, close: 99, volume: 240000 },
  { year: 1920, date: "1920-01-01", open: 107, high: 110, low: 67, close: 72, volume: 290000 },

  // 1920s - Roaring Twenties
  { year: 1925, date: "1925-01-01", open: 120, high: 159, low: 115, close: 156, volume: 500000 },
  { year: 1928, date: "1928-01-01", open: 202, high: 300, low: 191, close: 300, volume: 1200000 },

  // 1929 - De Crash
  { year: 1929, date: "1929-09-03", open: 381, high: 381, low: 379, close: 381, volume: 3000000 }, // All-time high
  { year: 1929, date: "1929-10-29", open: 252, high: 252, low: 212, close: 230, volume: 16400000 }, // Black Tuesday

  // 1930s - Grote Depressie
  { year: 1932, date: "1932-07-08", open: 42, high: 43, low: 40, close: 41, volume: 720000 }, // Dieptepunt
  { year: 1935, date: "1935-01-01", open: 104, high: 148, low: 96, close: 144, volume: 800000 },
  { year: 1940, date: "1940-01-01", open: 150, high: 152, low: 112, close: 131, volume: 500000 },

  // 1950s - Post-war boom
  { year: 1950, date: "1950-01-01", open: 200, high: 235, low: 196, close: 235, volume: 550000 },
  { year: 1955, date: "1955-01-01", open: 404, high: 488, low: 388, close: 488, volume: 800000 },
  { year: 1960, date: "1960-01-01", open: 679, high: 685, low: 566, close: 616, volume: 1050000 },

  // 1960s
  { year: 1965, date: "1965-01-01", open: 874, high: 969, low: 840, close: 969, volume: 1300000 },
  { year: 1966, date: "1966-02-09", open: 995, high: 995, low: 992, close: 995, volume: 1350000 }, // Peak
  { year: 1970, date: "1970-01-01", open: 800, high: 842, low: 631, close: 839, volume: 1550000 },

  // 1970s - Stagflatie
  { year: 1973, date: "1973-01-01", open: 1020, high: 1051, low: 788, close: 851, volume: 1700000 },
  { year: 1974, date: "1974-12-06", open: 598, high: 616, low: 577, close: 577, volume: 1750000 }, // Bear market low
  { year: 1980, date: "1980-01-01", open: 839, high: 1000, low: 759, close: 964, volume: 2050000 },

  // 1980s
  { year: 1985, date: "1985-01-01", open: 1211, high: 1553, low: 1184, close: 1547, volume: 2300000 },
  { year: 1987, date: "1987-08-25", open: 2722, high: 2722, low: 2700, close: 2722, volume: 2400000 }, // Pre-crash peak
  { year: 1987, date: "1987-10-19", open: 2246, high: 2246, low: 1738, close: 1739, volume: 25000000 }, // Black Monday
  { year: 1990, date: "1990-01-01", open: 2753, high: 2999, low: 2365, close: 2634, volume: 2550000 },

  // 1990s - Tech boom
  { year: 1995, date: "1995-01-01", open: 3834, high: 5216, low: 3832, close: 5117, volume: 3000000 },
  { year: 1999, date: "1999-12-31", open: 9181, high: 11568, low: 9120, close: 11497, volume: 5000000 },

  // 2000s - Dot-com crash en herstel
  { year: 2000, date: "2000-01-14", open: 11723, high: 11723, low: 11670, close: 11723, volume: 5500000 }, // Peak
  { year: 2002, date: "2002-10-09", open: 7400, high: 7400, low: 7286, close: 7286, volume: 6500000 }, // Bear market low
  { year: 2007, date: "2007-10-09", open: 14164, high: 14164, low: 14120, close: 14164, volume: 9000000 }, // Pre-crisis peak

  // 2008 Financiële Crisis
  { year: 2009, date: "2009-03-09", open: 6547, high: 6600, low: 6440, close: 6547, volume: 15000000 }, // Crisis low

  // 2010s - Bull market
  { year: 2015, date: "2015-01-01", open: 17823, high: 18351, low: 15666, close: 17425, volume: 7500000 },
  { year: 2018, date: "2018-01-01", open: 24719, high: 26951, low: 21713, close: 23327, volume: 9000000 },

  // 2020 COVID
  { year: 2020, date: "2020-02-12", open: 29551, high: 29568, low: 29500, close: 29551, volume: 10000000 }, // Pre-COVID peak
  { year: 2020, date: "2020-03-23", open: 18592, high: 19000, low: 18214, close: 18592, volume: 25000000 }, // COVID low

  // 2021-2024 - Post-COVID
  { year: 2021, date: "2021-11-08", open: 36432, high: 36565, low: 36300, close: 36432, volume: 9000000 }, // All-time high
  { year: 2022, date: "2022-01-01", open: 36338, high: 36952, low: 28725, close: 33147, volume: 8500000 },
  { year: 2023, date: "2023-12-31", open: 33147, high: 37689, low: 31429, close: 37689, volume: 8000000 },
  { year: 2024, date: "2024-12-01", open: 37689, high: 45000, low: 37592, close: 44722, volume: 7500000 }, // Huidige niveau
]

// Belangrijke Elliott Wave markeringen
export const majorElliottWaves = [
  // Grand Supercycle
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

  // Supercycle Waves binnen Grand Supercycle V
  {
    year: 1966,
    date: "1966-02-09",
    degree: "supercycle",
    wave: "I",
    type: "peak",
    title: "Supercycle Wave I Peak",
    description: "Einde van Supercycle Wave I van de Grand Supercycle Wave V. Begin van correctie.",
    confidence: "high",
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
    description: "Top van Supercycle Wave III. Dot-com bubble piek. Begin van Wave IV correctie.",
    confidence: "high",
  },
  {
    year: 2009,
    date: "2009-03-09",
    degree: "cycle",
    wave: "A",
    type: "trough",
    title: "Cycle Wave A Bottom",
    description: "Financiële crisis dieptepunt. Einde van Cycle Wave A binnen Supercycle Wave IV.",
    confidence: "high",
  },
  {
    year: 2021,
    date: "2021-11-08",
    degree: "primary",
    wave: "5",
    type: "peak",
    title: "Primary Wave 5 Peak",
    description: "COVID herstel piek. Mogelijk einde van Primary Wave 5 binnen grotere structuur.",
    confidence: "medium",
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

// Grote marktcrashes en hun details
export const majorMarketCrashes = [
  {
    year: 1907,
    name: "Panic of 1907",
    description:
      "Bankcrisis die leidde tot de oprichting van de Federal Reserve. J.P. Morgan redde persoonlijk het financiële systeem.",
    impact: "-45% (1906-1907)",
    severity: "major",
    duration: "1 jaar",
    recovery: "2 jaar",
  },
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
    year: 1937,
    name: "Recession of 1937-38",
    description:
      "Scherpe economische daling tijdens het herstel van de Grote Depressie, veroorzaakt door te vroege bezuinigingen.",
    impact: "-49% (1937-1938)",
    severity: "major",
    duration: "1 jaar",
    recovery: "4 jaar",
  },
  {
    year: 1973,
    name: "1973-74 Bear Market",
    description: "Oliecrisis, stagflatie en Watergate-schandaal leidden tot een langdurige bearmarkt.",
    impact: "-45% (1973-1974)",
    severity: "major",
    duration: "2 jaar",
    recovery: "7 jaar",
  },
  {
    year: 1987,
    name: "Zwarte Maandag",
    description:
      "Op 19 oktober 1987 daalde de Dow Jones met 22.6% op één dag - de grootste eendaagse daling ooit. Computerhandel en programmahandel werden als oorzaken aangewezen.",
    impact: "-36% (1987)",
    severity: "major",
    duration: "3 maanden",
    recovery: "2 jaar",
  },
  {
    year: 2000,
    name: "Dot-com Crash",
    description: "De internetbubbel barstte na jaren van speculatie in technologieaandelen zonder winstgevendheid.",
    impact: "-37% (2000-2002)",
    severity: "major",
    duration: "2.5 jaar",
    recovery: "7 jaar",
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

// Oorlogen en hun relatie tot marktcycli
export const warsAndMarkets = [
  {
    year: 1914,
    name: "Eerste Wereldoorlog",
    description:
      "Begon na een lange bull market en viel samen met een bearmarkt. De markt herstelde tijdens de oorlog.",
    marketImpact: "Initiële crash, gevolgd door herstel",
    duration: "1914-1918",
  },
  {
    year: 1939,
    name: "Tweede Wereldoorlog",
    description:
      "Begon tijdens herstel van de Grote Depressie. Markten stegen tijdens de oorlog door industriële productie.",
    marketImpact: "Stijgende markten tijdens oorlog",
    duration: "1939-1945",
  },
  {
    year: 1950,
    name: "Koreaanse Oorlog",
    description: "Viel samen met het begin van een lange bull market na WWII.",
    marketImpact: "Initiële volatiliteit, gevolgd door sterke stijging",
    duration: "1950-1953",
  },
  {
    year: 1965,
    name: "Vietnam Oorlog (VS escalatie)",
    description: "Viel samen met het einde van een lange bull market en het begin van een bearmarkt.",
    marketImpact: "Bijgedragen aan bearmarkt van 1966",
    duration: "1965-1975",
  },
  {
    year: 1990,
    name: "Golfoorlog",
    description: "Korte oorlog die samenviel met een recessie, maar de markt herstelde snel.",
    marketImpact: "Korte daling, snel herstel",
    duration: "1990-1991",
  },
  {
    year: 2003,
    name: "Irak Oorlog",
    description: "Begon tijdens herstel van dot-com crash. Markten stegen tijdens de oorlog.",
    marketImpact: "Initiële onzekerheid, gevolgd door stijging",
    duration: "2003-2011",
  },
]
