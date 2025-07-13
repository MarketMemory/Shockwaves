export interface ProfessionalWaveData {
  degree: string
  timeframe: string
  waves: WavePoint[]
  currentPosition: string
  projection?: WaveProjection
}

export interface WavePoint {
  id: string
  label: string
  date: string
  price: number
  type: "impulse" | "corrective"
  degree: "grand-supercycle" | "supercycle" | "cycle" | "primary" | "intermediate"
  description?: string
}

export interface WaveProjection {
  targetDate: string
  targetPrice: number
  confidence: "high" | "medium" | "low"
}

// Professional Elliott Wave data based on TradingView analysis
export const professionalElliottWaves: ProfessionalWaveData[] = [
  {
    degree: "Grand Supercycle",
    timeframe: "Multiple Centuries",
    currentPosition: "Wave (V) in progress",
    waves: [
      {
        id: "gs-I",
        label: "(I)",
        date: "1896-01-01",
        price: 40,
        type: "impulse",
        degree: "grand-supercycle",
        description: "First Grand Supercycle wave from 1896",
      },
      {
        id: "gs-II",
        label: "(II)",
        date: "1932-07-08",
        price: 41,
        type: "corrective",
        degree: "grand-supercycle",
        description: "Great Depression correction",
      },
      {
        id: "gs-III",
        label: "(III)",
        date: "2000-01-14",
        price: 11723,
        type: "impulse",
        degree: "grand-supercycle",
        description: "Major bull market wave",
      },
      {
        id: "gs-IV",
        label: "(IV)",
        date: "2009-03-09",
        price: 6547,
        type: "corrective",
        degree: "grand-supercycle",
        description: "Financial crisis correction",
      },
      {
        id: "gs-V",
        label: "(V)",
        date: "2025-07-04",
        price: 44061,
        type: "impulse",
        degree: "grand-supercycle",
        description: "Current wave in progress",
      },
    ],
    projection: {
      targetDate: "2076-01-01",
      targetPrice: 60000,
      confidence: "medium",
    },
  },
  {
    degree: "Supercycle",
    timeframe: "Decades to a Century",
    currentPosition: "Wave 5 of (V)",
    waves: [
      {
        id: "sc-1",
        label: "1",
        date: "2009-03-09",
        price: 6547,
        type: "impulse",
        degree: "supercycle",
        description: "Post-crisis recovery wave",
      },
      {
        id: "sc-2",
        label: "2",
        date: "2016-02-11",
        price: 15451,
        type: "corrective",
        degree: "supercycle",
        description: "Mid-cycle correction",
      },
      {
        id: "sc-3",
        label: "3",
        date: "2021-11-08",
        price: 36799,
        type: "impulse",
        degree: "supercycle",
        description: "Extended third wave",
      },
      {
        id: "sc-4",
        label: "4",
        date: "2022-10-12",
        price: 28660,
        type: "corrective",
        degree: "supercycle",
        description: "Fourth wave correction",
      },
      {
        id: "sc-5",
        label: "5",
        date: "2025-07-04",
        price: 44061,
        type: "impulse",
        degree: "supercycle",
        description: "Final fifth wave in progress",
      },
    ],
  },
]

// Submillennium wave structure (less than 1,000 years)
export const submillenniumWaves = [
  {
    id: "sub-1",
    label: "1",
    period: "1896-1929",
    description: "Initial industrial expansion",
    startPrice: 40,
    endPrice: 381,
  },
  {
    id: "sub-2",
    label: "2",
    period: "1929-1932",
    description: "Great Depression correction",
    startPrice: 381,
    endPrice: 41,
  },
]

// Current wave analysis for 2025
export const currentWaveAnalysis = {
  date: "2025-07-04",
  price: 44061.49,
  change: 733.76,
  changePercent: 1.66,
  currentDegree: "Grand Supercycle Wave (V)",
  subWave: "Supercycle Wave 5",
  status: "In Progress",
  nextTarget: "60,000 - 80,000",
  timeframe: "2025-2030",
  riskLevel: "Medium",
  confidence: "High",
}
