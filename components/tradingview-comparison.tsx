"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Info } from "lucide-react"

export function TradingViewComparison() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-200 flex items-center space-x-2">
              <span>📊 Data Vergelijking</span>
            </CardTitle>
            <CardDescription className="text-slate-400">Shockwaves vs. TradingView</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="h-4 w-4 mr-2" />
            {showInfo ? "Verberg Info" : "Toon Info"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showInfo && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
              <h3 className="text-sm font-medium text-slate-200 mb-2">Verschillen tussen Shockwaves en TradingView</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    <strong>Data Bronnen:</strong> TradingView gebruikt officiële marktdata van professionele providers,
                    terwijl Shockwaves een combinatie gebruikt van historische data, Alpha Vantage API (gratis tier), en
                    gegenereerde mock data.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    <strong>Schaling:</strong> Voor DIA ETF data passen we een schaalfactor toe om de DJIA waarden te
                    benaderen (DIA ≈ DJIA/100), wat kan leiden tot kleine afwijkingen.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    <strong>Historische Nauwkeurigheid:</strong> Onze historische data (pre-2020) is handmatig
                    samengesteld uit verschillende bronnen en kan afwijken van de officiële waarden.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    <strong>API Beperkingen:</strong> De gratis Alpha Vantage tier heeft een limiet van 25 requests per
                    dag, waardoor we vaak terugvallen op mock data.
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
              <h3 className="text-sm font-medium text-slate-200 mb-2">Waarom deze verschillen?</h3>
              <p className="text-xs text-slate-300 mb-2">
                Shockwaves is ontworpen als een 100% gratis educatieve tool die de belangrijkste marktbewegingen en
                Elliott Wave patronen visualiseert, zonder de kosten van premium data abonnementen.
              </p>
              <p className="text-xs text-slate-300">
                Voor exacte, real-time marktdata voor trading doeleinden raden we aan om professionele platforms zoals
                TradingView te gebruiken.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-400"
                onClick={() => window.open("https://www.tradingview.com/chart/6BcSrgn0/", "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open TradingView Chart
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
            <Badge variant="outline" className="mb-2 bg-blue-600">
              Shockwaves
            </Badge>
            <div className="space-y-1 text-xs">
              <p className="text-slate-300">
                <span className="text-slate-400">Data:</span> Historisch + Alpha Vantage/Mock
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Kosten:</span> 100% Gratis
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Focus:</span> Elliott Waves, Crashes, Educatie
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Updates:</span> Dagelijks (API limiet)
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-700/30 border border-slate-600 rounded-lg">
            <Badge variant="outline" className="mb-2 bg-green-600">
              TradingView
            </Badge>
            <div className="space-y-1 text-xs">
              <p className="text-slate-300">
                <span className="text-slate-400">Data:</span> Officiële marktdata
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Kosten:</span> Gratis basis / Premium
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Focus:</span> Trading, Technische Analyse
              </p>
              <p className="text-slate-300">
                <span className="text-slate-400">Updates:</span> Real-time (premium)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
