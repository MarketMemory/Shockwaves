"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, TrendingDown, AlertTriangle, Zap } from "lucide-react"
import { majorCrashes } from "@/lib/crash-data"

export function CrashTimeline() {
  const [showAddForm, setShowAddForm] = useState(false)

  const getCrashIcon = (severity: string) => {
    switch (severity) {
      case "extreme":
        return <TrendingDown className="h-4 w-4" />
      case "major":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getCrashColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "destructive"
      case "major":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-200 flex items-center space-x-2">
              <span>💥 Crash Timeline</span>
            </CardTitle>
            <CardDescription className="text-slate-400">Historische marktschokken</CardDescription>
          </div>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)} className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="p-4 bg-slate-700/50 border-slate-600">
            <div className="space-y-3">
              <Input placeholder="Crash naam" className="bg-slate-800 border-slate-600 text-slate-200" />
              <Textarea
                placeholder="Beschrijving van de crash"
                rows={3}
                className="bg-slate-800 border-slate-600 text-slate-200"
              />
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Jaar"
                  className="flex-1 bg-slate-800 border-slate-600 text-slate-200"
                />
                <Input placeholder="Impact %" className="flex-1 bg-slate-800 border-slate-600 text-slate-200" />
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                  💥 Toevoegen
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Annuleren
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {majorCrashes.map((crash, index) => (
            <Card key={index} className="p-3 bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={getCrashColor(crash.severity) as any} className="text-xs bg-red-600">
                    {getCrashIcon(crash.severity)}
                    <span className="ml-1">{crash.severity}</span>
                  </Badge>
                  <span className="text-xs text-slate-400 font-bold">{crash.year}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-200">{crash.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{crash.description}</p>
                <div className="text-xs">
                  <span className="text-slate-400">Impact: </span>
                  <span className="text-red-400 font-bold">{crash.impact}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
