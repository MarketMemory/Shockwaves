"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar, TrendingDown, Briefcase, Globe } from "lucide-react"
import { events } from "@/lib/mock-data"

export function EventsPanel() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterType, setFilterType] = useState("all")

  const filteredEvents = filterType === "all" ? events : events.filter((event) => event.type === filterType)

  const getEventIcon = (type: string) => {
    switch (type) {
      case "crisis":
        return <TrendingDown className="h-4 w-4" />
      case "political":
        return <Globe className="h-4 w-4" />
      case "economic":
        return <Briefcase className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "crisis":
        return "destructive"
      case "political":
        return "secondary"
      case "economic":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Gebeurtenissen</CardTitle>
            <CardDescription>Historische marktgebeurtenissen</CardDescription>
          </div>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger>
            <SelectValue placeholder="Filter gebeurtenissen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle gebeurtenissen</SelectItem>
            <SelectItem value="crisis">Crisis</SelectItem>
            <SelectItem value="political">Politiek</SelectItem>
            <SelectItem value="economic">Economisch</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="p-4 bg-slate-50">
            <div className="space-y-3">
              <Input placeholder="Gebeurtenis titel" />
              <Textarea placeholder="Beschrijving" rows={3} />
              <div className="flex space-x-2">
                <Input type="date" className="flex-1" />
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crisis">Crisis</SelectItem>
                    <SelectItem value="political">Politiek</SelectItem>
                    <SelectItem value="economic">Economisch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Toevoegen
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuleren
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredEvents.map((event, index) => (
            <Card key={index} className="p-3 hover:bg-slate-50 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={getEventColor(event.type) as any} className="text-xs">
                    {getEventIcon(event.type)}
                    <span className="ml-1 capitalize">{event.type}</span>
                  </Badge>
                  <span className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString("nl-NL")}</span>
                </div>
                <h4 className="font-medium text-sm text-slate-900">{event.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                {event.impact && (
                  <div className="text-xs">
                    <span className="text-slate-500">Impact: </span>
                    <span className={event.impact > 0 ? "text-green-600" : "text-red-600"}>
                      {event.impact > 0 ? "+" : ""}
                      {event.impact}%
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
