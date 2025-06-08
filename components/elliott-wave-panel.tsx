"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { elliotWaves, elliotWaveDegrees } from "@/lib/crash-data"

interface ElliottWavePanelProps {
  visibleDegrees: string[]
  onToggleDegree: (degreeId: string) => void
  showWaves: boolean
  onToggleWaves: (show: boolean) => void
}

export function ElliottWavePanel({ visibleDegrees, onToggleDegree, showWaves, onToggleWaves }: ElliottWavePanelProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState("all")

  const filteredWaves =
    selectedDegree === "all" ? elliotWaves : elliotWaves.filter((wave) => wave.degree === selectedDegree)

  const getWaveIcon = (type: string) => {
    switch (type) {
      case "peak":
        return <TrendingUp className="h-4 w-4" />
      case "trough":
        return <TrendingDown className="h-4 w-4" />
      case "projection":
        return <Activity className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-orange-600"
      case "projection":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getDegreeInfo = (degreeId: string) => {
    return elliotWaveDegrees.find((d) => d.id === degreeId)
  }

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-200 flex items-center space-x-2">
              <span>🌊 Elliott Waves</span>
            </CardTitle>
            <CardDescription className="text-slate-400">Wave Degree Analysis</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={showWaves} onCheckedChange={onToggleWaves} />
            <Button size="sm" onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Wave Degree Toggles */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300">Wave Degrees:</h4>
          <div className="grid grid-cols-1 gap-2">
            {elliotWaveDegrees.map((degree) => (
              <div key={degree.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: degree.color }} />
                  <span className="text-sm text-slate-200">{degree.name}</span>
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                    {degree.symbol}
                  </Badge>
                </div>
                <Switch
                  checked={visibleDegrees.includes(degree.id)}
                  onCheckedChange={() => onToggleDegree(degree.id)}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
          <SelectTrigger className="bg-slate-700 border-slate-600">
            <SelectValue placeholder="Filter by degree" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Degrees</SelectItem>
            {elliotWaveDegrees.map((degree) => (
              <SelectItem key={degree.id} value={degree.id}>
                {degree.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="p-4 bg-slate-700/50 border-slate-600">
            <div className="space-y-3">
              <Input placeholder="Wave titel" className="bg-slate-800 border-slate-600 text-slate-200" />
              <Textarea
                placeholder="Wave beschrijving"
                rows={3}
                className="bg-slate-800 border-slate-600 text-slate-200"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" className="bg-slate-800 border-slate-600 text-slate-200" />
                <Select>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue placeholder="Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    {elliotWaveDegrees.map((degree) => (
                      <SelectItem key={degree.id} value={degree.id}>
                        {degree.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input placeholder="Wave (I,II,III...)" className="bg-slate-800 border-slate-600 text-slate-200" />
                <Select>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peak">Peak</SelectItem>
                    <SelectItem value="trough">Trough</SelectItem>
                    <SelectItem value="projection">Projection</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-slate-800 border-slate-600">
                    <SelectValue placeholder="Confidence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="projection">Projection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  🌊 Toevoegen
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

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredWaves.map((wave, index) => {
            const degreeInfo = getDegreeInfo(wave.degree)
            return (
              <Card key={index} className="p-3 bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: degreeInfo?.color || "#666" }} />
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {degreeInfo?.symbol} {wave.wave}
                      </Badge>
                      <Badge className={`text-xs ${getConfidenceColor(wave.confidence)}`}>
                        {getWaveIcon(wave.type)}
                        <span className="ml-1">{wave.confidence}</span>
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400 font-bold">{wave.year}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-200">{wave.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{wave.description}</p>
                  <div className="text-xs text-slate-400">
                    <span className="font-medium">{degreeInfo?.name}</span> • {degreeInfo?.duration}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
