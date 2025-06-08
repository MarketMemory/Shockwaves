export interface ChartTheme {
  id: string
  name: string
  background: string
  cardBackground: string
  textPrimary: string
  textSecondary: string
  border: string
  candlestick: {
    up: string
    down: string
    wick: string
  }
  grid: string
  axis: string
  crashes: string
  waves: {
    grandSupercycle: string
    supercycle: string
    cycle: string
    primary: string
    intermediate: string
    minor: string
  }
}

export const chartThemes: ChartTheme[] = [
  {
    id: "dark",
    name: "Dark Professional",
    background: "from-slate-900 via-slate-800 to-red-900",
    cardBackground: "bg-slate-800/60",
    textPrimary: "text-slate-200",
    textSecondary: "text-slate-400",
    border: "border-slate-700",
    candlestick: {
      up: "#00ff88",
      down: "#ff4444",
      wick: "#888888",
    },
    grid: "#475569",
    axis: "#94a3b8",
    crashes: "#ef4444",
    waves: {
      grandSupercycle: "#ffd700",
      supercycle: "#ff6b35",
      cycle: "#f7931e",
      primary: "#00d4ff",
      intermediate: "#0099cc",
      minor: "#7b68ee",
    },
  },
  {
    id: "light",
    name: "Light Professional",
    background: "from-slate-50 via-white to-blue-50",
    cardBackground: "bg-white/80",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    border: "border-slate-200",
    candlestick: {
      up: "#16a34a",
      down: "#dc2626",
      wick: "#64748b",
    },
    grid: "#e2e8f0",
    axis: "#475569",
    crashes: "#dc2626",
    waves: {
      grandSupercycle: "#eab308",
      supercycle: "#ea580c",
      cycle: "#f59e0b",
      primary: "#0284c7",
      intermediate: "#0369a1",
      minor: "#7c3aed",
    },
  },
  {
    id: "trading-view",
    name: "TradingView Style",
    background: "from-slate-900 to-slate-800",
    cardBackground: "bg-slate-900/90",
    textPrimary: "text-white",
    textSecondary: "text-slate-300",
    border: "border-slate-600",
    candlestick: {
      up: "#26a69a",
      down: "#ef5350",
      wick: "#787b86",
    },
    grid: "#363a45",
    axis: "#787b86",
    crashes: "#ef5350",
    waves: {
      grandSupercycle: "#ffeb3b",
      supercycle: "#ff9800",
      cycle: "#ff5722",
      primary: "#2196f3",
      intermediate: "#3f51b5",
      minor: "#9c27b0",
    },
  },
]

export const defaultTheme = chartThemes[0]
