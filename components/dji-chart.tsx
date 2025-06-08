"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { djiData, events } from "@/lib/mock-data"

export function DJIChart() {
  const [showEvents, setShowEvents] = useState(true)

  const timeframes = [
    { label: "1M", value: "1M" },
    { label: "3M", value: "3M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "ALL", value: "ALL" },
  ]

  return djiData.filter((item) => new Date(item.date) >= startDate)
}
 (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Dow Jones Industrial Average</CardTitle>
            <CardDescription>Interactieve grafiek met historische gebeurtenissen</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant={showEvents ? "default" : "outline"} size="sm" onClick={() => setShowEvents(!showEvents)}>
              Gebeurtenissen
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.value}
              variant={"outline"}
              size="sm"
              onClick={() => {}} // Geen filtering meer, dus geen actie
            >
              {timeframe.label}
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
            <LineChart data={djiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("nl-NL", { month: "short", day: "numeric" })
                }
              />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const event = events.find((e) => e.date === label)
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="font-medium">{new Date(label).toLocaleDateString("nl-NL")}</p>
                        <p className="text-blue-600">${payload[0].value?.toLocaleString()}</p>
                        {event && showEvents && (
                          <div className="mt-2 pt-2 border-t">
                            <Badge variant="secondary" className="mb-1">
                              {event.type}
                            </Badge>
                            <p className="text-sm text-slate-600">{event.title}</p>
                          </div>
                        )}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={true} // Line with markers
                activeDot={{ r: 4 }}
              />

              {showEvents &&
                events.map((event, index) => (
                  <ReferenceLine
                    key={index}
                    x={event.date}
                    stroke={event.type === "crisis" ? "#ef4444" : event.type === "political" ? "#f59e0b" : "#10b981"}
                    strokeDasharray="5 5"
                    label={{
                      value: event.title.substring(0, 20) + "...",
                      position: "top",
                      className: "text-xs fill-slate-600",
                    }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

