"use client"

import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TestResultsChart } from "../test-results-chart"

// Mock data - replace with actual API call
const getTestData = (testId: string) => ({
  id: testId,
  name: `Test ${testId}`,
  mathsScore: 85,
  physicsScore: 78,
  chemistryScore: 92,
  totalScore: 255,
  timeTaken: "1h 30m",
  accuracy: 85,
  date: "2024-02-08",
})

export default function TestAnalyticsPage() {
  const params = useParams()
  const testId = params.testId as string
  const testData = getTestData(testId)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Test Analysis - {testData.name}</h1>
      <div className="grid gap-6">
        <TestResultsChart
          data={[
            {
              testName: testData.name,
              mathsScore: testData.mathsScore,
              physicsScore: testData.physicsScore,
              chemistryScore: testData.chemistryScore,
            },
          ]}
        />
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{testData.totalScore}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Time Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{testData.timeTaken}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{testData.accuracy}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{testData.date}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

