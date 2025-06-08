import { ShockwavesChart } from "@/components/shockwaves-chart"
import { CrashTimeline } from "@/components/crash-timeline"
import { Header } from "@/components/header"
import { ImpactCards } from "@/components/impact-cards"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              SHOCKWAVES
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Van de Crash van 1929 tot de Crisis van 2008 - Ontdek de schokgolven die de markten vormden
            </p>
            <div className="flex justify-center space-x-4 text-sm text-slate-400">
              <span>📈 Historische Data</span>
              <span>💥 Grote Crashes</span>
              <span>🌊 Marktschokken</span>
              <span>🆓 Volledig Gratis</span>
            </div>
          </div>

          <ImpactCards />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3">
              <ShockwavesChart />
            </div>
            <div className="xl:col-span-1">
              <CrashTimeline />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
