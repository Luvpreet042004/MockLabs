"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TestScore {
  testName: string
  mathsScore: number
  physicsScore: number
  chemistryScore: number
}

interface TestResultsChartProps {
  data: TestScore[]
}

export function TestResultsChart({ data }: TestResultsChartProps) {
  const chartData = data.map((score) => ({
    name: score.testName,
    Maths: score.mathsScore,
    Physics: score.physicsScore,
    Chemistry: score.chemistryScore,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Performance</CardTitle>
        <CardDescription>Your scores across different subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="Maths" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Physics" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Chemistry" fill="#db2777" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

