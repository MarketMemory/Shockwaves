"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, BarChart3 } from "lucide-react"
import Image from "next/image"

export function TradingViewReference() {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          TradingView Professional Analysis
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            July 4, 2025
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Reference Image */}
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/tradingview-elliott-analysis.png"
              alt="TradingView Elliott Wave Analysis of DJIA"
              fill
              className="object-contain"
            />
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Key Wave Levels</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Grand Supercycle (I): 1896 start at 40 points</li>
                <li>• Grand Supercycle (II): 1932 low at 41 points</li>
                <li>• Grand Supercycle (III): 2000 peak at 11,723</li>
                <li>• Grand Supercycle (IV): 2009 low at 6,547</li>
                <li>• Grand Supercycle (V): Current wave at 44,061</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Time Projections</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Multiple Centuries: Grand Supercycle</li>
                <li>• Decades to Century: Supercycle</li>
                <li>• Submillennium: {"<"} 1,000 years</li>
                <li>• Current target: 2076 completion</li>
                <li>• Price target: 60,000+ points</li>
              </ul>
            </div>
          </div>

          {/* Source Attribution */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">Source: TradingView.com Professional Analysis</div>
            <a
              href="https://tradingview.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              View on TradingView
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
