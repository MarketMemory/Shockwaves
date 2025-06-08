import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Activity, Calendar } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Huidige Waarde",
      value: "34,721.12",
      change: "+1.24%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Dagelijkse Verandering",
      value: "+425.67",
      change: "Laatste 24u",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Volume",
      value: "2.1B",
      change: "Handelsvolume",
      trend: "neutral",
      icon: Activity,
    },
    {
      title: "Gebeurtenissen",
      value: "12",
      change: "Deze maand",
      trend: "neutral",
      icon: Calendar,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-slate-500"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
