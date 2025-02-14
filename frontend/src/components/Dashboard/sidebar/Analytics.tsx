import { AccuracyCard } from "./analytics/accuracy-card"
import { ComparisonChart } from "./analytics/comparison-chart"
import { ScoreDistribution } from "./analytics/score-distribution"

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ComparisonChart />
        <ScoreDistribution />
        <AccuracyCard />
      </div>
    </div>
  )
}

 