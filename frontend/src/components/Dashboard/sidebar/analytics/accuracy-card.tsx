import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccuracyCard({ accuracy }: { accuracy: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Accuracy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center">{accuracy}%</div>
      </CardContent>
    </Card>
  )
}

