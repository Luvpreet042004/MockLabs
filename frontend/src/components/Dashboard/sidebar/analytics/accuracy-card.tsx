"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"


const getColor = (accuracy: number) => {
  if (accuracy < 50) {
    // Interpolate from Red to Yellow
    const red = 255
    const green = Math.round((accuracy / 50) * 255) // 0 → 255
    return `rgb(${red}, ${green}, 0)`
  } else {
    // Interpolate from Yellow to Green
    const red = Math.round(255 - ((accuracy - 50) / 50) * 255) // 255 → 0
    const green = 255
    return `rgb(${red}, ${green}, 0)`
  }
}
export function AccuracyCard({ accuracy = 85 }: { accuracy: number }) {
  const data = [{ name: "Accuracy", value: accuracy }]
  const color = getColor(accuracy)
  const chartConfig = {
    Accuracy: {
      label: "Accuracy",
      color: `${color}`,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Accuracy</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer className="h-[200px] w-full" config={chartConfig}>
          <RadialBarChart
            width={400}
            height={400}
            innerRadius="100%"
            outerRadius="140%"
            data={data}
            startAngle={230}
            endAngle={-50}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={40} fill="" barSize={10}/>
          </RadialBarChart>
        </ChartContainer>
        <div className="text-center mt-4">
          <span className="text-4xl font-bold text-primary text-">{accuracy}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

