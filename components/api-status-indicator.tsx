import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, Wifi, WifiOff, TrendingUp } from "lucide-react"

interface ApiStatusIndicatorProps {
  apiStatus: string
  dataSource: string
  apiError?: string | null
  dataPoints: number
  hasApiKey: boolean
  liveDataInfo?: {
    symbol: string
    description: string
    scaling: string
    accuracy: string
  } | null
  compact?: boolean // Optie voor compacte weergave
}

export function ApiStatusIndicator({
  apiStatus,
  dataSource,
  apiError,
  dataPoints,
  hasApiKey,
  liveDataInfo,
  compact = false, // Standaard niet compact
}: ApiStatusIndicatorProps) {
  const getStatusIcon = () => {
    if (apiStatus.includes("success")) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (apiStatus.includes("attempting")) return <Clock className="h-4 w-4 text-yellow-500" />
    if (apiStatus.includes("rate-limited")) return <AlertCircle className="h-4 w-4 text-orange-500" />
    if (apiStatus.includes("mock")) return <Wifi className="h-4 w-4 text-blue-500" />
    if (apiStatus.includes("failed")) return <AlertCircle className="h-4 w-4 text-red-500" />
    return <WifiOff className="h-4 w-4 text-gray-500" />
  }

  const getStatusColor = () => {
    if (apiStatus.includes("success")) return "bg-green-600"
    if (apiStatus.includes("attempting")) return "bg-yellow-600"
    if (apiStatus.includes("rate-limited")) return "bg-orange-600"
    if (apiStatus.includes("mock")) return "bg-blue-600"
    if (apiStatus.includes("failed")) return "bg-red-600"
    return "bg-gray-600"
  }

  const getStatusText = () => {
    switch (apiStatus) {
      case "success-alphavantage":
        return liveDataInfo?.symbol === "DIA" ? "Live DIA ETF" : "Live Data"
      case "attempting-alphavantage":
        return "Loading..."
      case "rate-limited":
        return "Rate Limited"
      case "failed-alphavantage":
        return "API Failed"
      case "historical-only":
        return "Historical Data"
      case "no-api-key":
        return "No API Key"
      default:
        return "Historical Data"
    }
  }

  // Als we de compacte versie willen, toon alleen de API key melding
  if (compact && !hasApiKey) {
    return (
      <div className="p-2 bg-blue-900/20 rounded border border-blue-700 text-center">
        <p className="text-xs text-blue-300">💡 Add ALPHA_VANTAGE_KEY environment variable for live DIA ETF data</p>
      </div>
    )
  }

  // Als we de compacte versie willen en er is een API key, toon niets
  if (compact && hasApiKey) {
    return null
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700">
      <CardContent className="p-3">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <div>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${getStatusColor()}`}>{getStatusText()}</Badge>
                {liveDataInfo?.symbol === "DIA" && (
                  <Badge variant="outline" className="text-xs border-green-600 text-green-400">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    DJIA Proxy
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">{dataPoints} data points</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-300 font-medium">Data Source</p>
            <p className="text-xs text-slate-400">{dataSource.split("(")[0].trim()}</p>
          </div>
        </div>

        {!hasApiKey && (
          <div className="mt-2 p-2 bg-blue-900/20 rounded border border-blue-700">
            <p className="text-xs text-blue-300">💡 Add ALPHA_VANTAGE_KEY for optional live data supplement</p>
          </div>
        )}

        {apiStatus === "rate-limited" && (
          <div className="mt-2 p-2 bg-orange-900/20 rounded border border-orange-700">
            <p className="text-xs text-orange-300">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              Alpha Vantage rate limit reached. Using complete historical data (1896-2024).
            </p>
          </div>
        )}

        {apiStatus === "historical-only" && hasApiKey && (
          <div className="mt-2 p-2 bg-blue-900/20 rounded border border-blue-700">
            <p className="text-xs text-blue-300">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              Using complete historical DJIA data. API supplement unavailable.
            </p>
          </div>
        )}

        {apiError && !apiError.includes("rate limit") && (
          <div className="mt-2 p-2 bg-red-900/20 rounded border border-red-700">
            <p className="text-xs text-red-300">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              {apiError}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
