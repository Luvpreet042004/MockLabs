import { AccuracyCard } from "./analytics/accuracy-card"
import { ComparisonChart } from "./analytics/comparison-chart"
import { ScoreDistribution } from "./analytics/score-distribution"
import { TimeChart } from "./analytics/time-chart"

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <ComparisonChart />
        <TimeChart />
        <ScoreDistribution />
        <AccuracyCard accuracy={85} />
      </div>
    </div>
  )
}

