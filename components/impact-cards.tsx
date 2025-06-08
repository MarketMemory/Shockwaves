import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, AlertTriangle, Calendar, Target } from "lucide-react"

export function ImpactCards() {
  const impacts = [
    {
      title: "Zwarte Dinsdag 1929",
      value: "-89%",
      description: "Grootste crash in geschiedenis",
      trend: "crash",
      icon: TrendingDown,
    },
    {
      title: "Financiële Crisis 2008",
      value: "-54%",
      description: "Subprime hypotheekcrisis",
      trend: "crash",
      icon: AlertTriangle,
    },
    {
      title: "Crashes Geanalyseerd",
      value: "15+",
      description: "Historische gebeurtenissen",
      trend: "neutral",
      icon: Calendar,
    },
    {
      title: "Voorspelling 2026",
      value: "?%",
      description: "Volgende mogelijke schok",
      trend: "warning",
      icon: Target,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {impacts.map((impact, index) => {
        const Icon = impact.icon
        return (
          <Card
            key={index}
            className="bg-slate-800/60 backdrop-blur-sm border-slate-700 hover:border-red-500/50 transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{impact.title}</CardTitle>
              <Icon
                className={`h-4 w-4 ${
                  impact.trend === "crash"
                    ? "text-red-400"
                    : impact.trend === "warning"
                      ? "text-yellow-400"
                      : "text-slate-400"
                }`}
              />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  impact.trend === "crash"
                    ? "text-red-400"
                    : impact.trend === "warning"
                      ? "text-yellow-400"
                      : "text-slate-200"
                }`}
              >
                {impact.value}
              </div>
              <p className="text-xs text-slate-400">{impact.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
