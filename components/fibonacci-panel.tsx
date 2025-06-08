"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Target } from "lucide-react"
import { historicalFibonacciPoints, getAllHistoricalFibLevels } from "@/lib/fibonacci-levels"

interface FibonacciPanelProps {
  showFibonacci: boolean
  onToggleFibonacci: (show: boolean) => void
  selectedFibPoint: string
  onSelectFibPoint: (pointId: string) => void
  isLogarithmic: boolean
}

export function FibonacciPanel({
  showFibonacci,
  onToggleFibonacci,
  selectedFibPoint,
  onSelectFibPoint,
  isLogarithmic,
}: FibonacciPanelProps) {
  const [showRetracements, setShowRetracements] = useState(true)
  const [showExtensions, setShowExtensions] = useState(false)

  const fibLevels = getAllHistoricalFibLevels(isLogarithmic)
  const selectedPoint = fibLevels.find((point) => point.id === selectedFibPoint)

  const getFibIcon = (type: string) => {
    switch (type) {
      case "bull":
        return <TrendingUp className="h-4 w-4" />
      case "crash":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getFibColor = (type: string) => {
    switch (type) {
      case "bull":
        return "bg-green-600"
      case "crash":
        return "bg-red-600"
      default:
        return "bg-blue-600"
    }
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-200 flex items-center space-x-2">
              <span>📐 Fibonacci Levels</span>
            </CardTitle>
            <CardDescription className="text-slate-400">Retracement & Extension Analysis</CardDescription>
          </div>
          <Switch checked={showFibonacci} onCheckedChange={onToggleFibonacci} />
        </div>

        <div className="space-y-3">
          <Select value={selectedFibPoint} onValueChange={onSelectFibPoint}>
            <SelectTrigger className="bg-slate-700 border-slate-600">
              <SelectValue placeholder="Selecteer Fibonacci punt" />
            </SelectTrigger>
            <SelectContent>
              {historicalFibonacciPoints.map((point) => (
                <SelectItem key={point.id} value={point.id}>
                  {point.name} ({point.start.year}-{point.end.year})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch checked={showRetracements} onCheckedChange={setShowRetracements} size="sm" />
              <span className="text-sm text-slate-300">Retracements</span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={showExtensions} onCheckedChange={setShowExtensions} size="sm" />
              <span className="text-sm text-slate-300">Extensions</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {selectedPoint && (
          <div className="space-y-4">
            {/* Point info */}
            <Card className="p-3 bg-slate-700/30 border-slate-600">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`text-xs ${getFibColor(selectedPoint.type)}`}>
                    {getFibIcon(selectedPoint.type)}
                    <span className="ml-1 capitalize">{selectedPoint.type}</span>
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {selectedPoint.start.year} - {selectedPoint.end.year}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-200">{selectedPoint.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedPoint.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Start: </span>
                    <span className="text-slate-200">${selectedPoint.start.price.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">End: </span>
                    <span className="text-slate-200">${selectedPoint.end.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Retracement levels */}
            {showRetracements && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-slate-300">🔄 Retracement Levels</h5>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {selectedPoint.retracementLevels.map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700/20 rounded text-xs">
                      <span className="text-yellow-400 font-medium">{level.percentage}</span>
                      <span className="text-slate-200">${level.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extension levels */}
            {showExtensions && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-slate-300">📈 Extension Levels</h5>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {selectedPoint.extensionLevels.map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700/20 rounded text-xs">
                      <span className="text-blue-400 font-medium">{level.percentage}</span>
                      <span className="text-slate-200">${level.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedPoint && (
          <div className="text-center text-slate-400 py-8">
            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Selecteer een Fibonacci punt om levels te bekijken</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
