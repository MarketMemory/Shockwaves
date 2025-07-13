"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { professionalElliottWaves, currentWaveAnalysis } from "@/lib/professional-elliott-waves"
import { TrendingUp, TrendingDown, Target, Clock, AlertTriangle } from "lucide-react"

export function ProfessionalElliottPanel() {
  const [selectedDegree, setSelectedDegree] = useState("Grand Supercycle")

  const currentWaveData = professionalElliottWaves.find((w) => w.degree === selectedDegree)

  return (
    <div className="space-y-6">
      {/* Current Analysis Header */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-blue-900">Professional Elliott Wave Analysis</CardTitle>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              TradingView Verified
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{currentWaveAnalysis.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Current DJIA</div>
              <div className="text-green-600 text-sm">
                +{currentWaveAnalysis.change} (+{currentWaveAnalysis.changePercent}%)
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">Wave (V)</div>
              <div className="text-sm text-gray-600">Grand Supercycle</div>
              <div className="text-blue-600 text-sm">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">60K - 80K</div>
              <div className="text-sm text-gray-600">Next Target</div>
              <div className="text-purple-600 text-sm">2025-2030</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">High</div>
              <div className="text-sm text-gray-600">Confidence</div>
              <div className="text-orange-600 text-sm">Medium Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wave Degree Selector */}
      <div className="flex gap-2 flex-wrap">
        {professionalElliottWaves.map((wave) => (
          <Button
            key={wave.degree}
            variant={selectedDegree === wave.degree ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDegree(wave.degree)}
            className="text-xs"
          >
            {wave.degree}
          </Button>
        ))}
      </div>

      {/* Selected Wave Analysis */}
      {currentWaveData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              {currentWaveData.degree} Analysis
            </CardTitle>
            <p className="text-sm text-gray-600">
              Timeframe: {currentWaveData.timeframe} | Current: {currentWaveData.currentPosition}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Wave Structure */}
              <div className="grid gap-3">
                {currentWaveData.waves.map((wave, index) => (
                  <div
                    key={wave.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index === currentWaveData.waves.length - 1
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={wave.type === "impulse" ? "default" : "secondary"}
                        className="min-w-[60px] justify-center"
                      >
                        {wave.label}
                      </Badge>
                      <div>
                        <div className="font-medium">{wave.description}</div>
                        <div className="text-sm text-gray-600">{wave.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{wave.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        {wave.type === "impulse" ? (
                          <TrendingUp className="h-4 w-4 text-green-600 inline" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 inline" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projection */}
              {currentWaveData.projection && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-900">Wave Projection</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Target Price</div>
                      <div className="font-semibold text-purple-700">
                        {currentWaveData.projection.targetPrice.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Target Date</div>
                      <div className="font-semibold text-purple-700">{currentWaveData.projection.targetDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Confidence</div>
                      <Badge variant="outline" className="text-purple-700 border-purple-300">
                        {currentWaveData.projection.confidence}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submillennium Context */}
      <Card className="border-orange-200 bg-orange-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <Clock className="h-5 w-5" />
            Submillennium Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-orange-800">
            <p className="mb-2">
              <strong>Historical Perspective:</strong> We are currently in a submillennium wave structure (less than
              1,000 years) that began in 1896 with the industrial revolution.
            </p>
            <p>
              <strong>Current Position:</strong> The analysis suggests we are in the final stages of Grand Supercycle
              Wave (V), which could extend into the 2070s with potential targets between 60,000-80,000 points.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Warning */}
      <Card className="border-red-200 bg-red-50/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800">
              <strong>Disclaimer:</strong> Elliott Wave analysis is subjective and should be used in conjunction with
              other technical and fundamental analysis tools. Wave counts can change as new price data becomes
              available.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
