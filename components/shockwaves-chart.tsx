"use client"

import { useState } from "react"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { historicalData, majorCrashes } from "@/lib/crash-data"
import { Activity, Zap } from "lucide-react"

export function ShockwavesChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("ALL")
  const [showCrashes, setShowCrashes] = useState(true)

  const periods = [
    { label: "1920s", value: "1920s" },
    { label: "2000s", value: "2000s" },
    { label: "2020s", value: "2020s" },
    { label: "ALL", value: "ALL" },
  ]

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-red-400" />
            <div>
              <CardTitle className="text-xl text-slate-200 flex items-center space-x-2">
                <span>Dow Jones Shockwaves</span>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardTitle>
              <CardDescription className="text-slate-400">
                Van 1929 tot nu - De grootste marktschokken in de geschiedenis
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={showCrashes ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCrashes(!showCrashes)}
              className="bg-red-600 hover:bg-red-700 border-red-600"
            >
              💥 Crashes
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
              className={
                selectedPeriod === period.value
                  ? "bg-gradient-to-r from-red-600 to-orange-600"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }
            >
              {period.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "DJI Waarde",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[500px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="shockwaveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-20" stroke="#475569" />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                tickFormatter={(value) => value.toString()}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const crash = majorCrashes.find((c) => c.year === label)
                    return (
                      <div className="bg-slate-800 p-4 border border-slate-600 rounded-lg shadow-xl">
                        <p className="font-bold text-slate-200 text-lg">{label}</p>
                        <p className="text-red-400 text-xl font-bold">${payload[0].value?.toLocaleString()}</p>
                        {crash && showCrashes && (
                          <div className="mt-3 pt-3 border-t border-slate-600">
                            <Badge variant="destructive" className="mb-2 bg-red-600">
                              💥 {crash.name}
                            </Badge>
                            <p className="text-sm text-slate-300 leading-relaxed">{crash.description}</p>
                            <p className="text-red-400 font-bold mt-2">Impact: {crash.impact}</p>
                          </div>
                        )}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#shockwaveGradient)"
                dot={false}
                activeDot={{ r: 6, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 2 }}
              />

              {showCrashes &&
                majorCrashes.map((crash, index) => (
                  <ReferenceLine
                    key={index}
                    x={crash.year}
                    stroke="#ef4444"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    label={{
                      value: `💥 ${crash.name}`,
                      position: "topLeft",
                      className: "text-xs fill-red-400 font-bold",
                    }}
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
