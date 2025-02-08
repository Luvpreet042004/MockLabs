"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    subject: "Mathematics",
    average: 85,
  },
  {
    subject: "Physics",
    average: 78,
  },
  {
    subject: "Chemistry",
    average: 92,
  },
]

export function ComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="subject" type="category" />
            <Bar dataKey="average" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

