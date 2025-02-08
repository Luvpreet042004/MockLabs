"use client"

import { useEffect, useState } from "react"

import { DashboardSidebar } from "../components/Dashboard/dashboard-sidebar"
import { TestResultsChart } from "../components/Dashboard/test-results-chart"
import { TestResultsTable } from "../components/Dashboard/test-results-table"
import DashboardLayout from "../components/Dashboard/layout"
import { NewTestDialog } from "@/components/Dashboard/sidebar/New_test_Modal"

// Sample data - replace with your actual data source
const testResults = [
  {
    id: "1",
    testName: "Test 1",
    mathsScore: 85,
    physicsScore: 78,
    chemistryScore: 92,
    totalScore: 255,
  },
  {
    id: "2",
    testName: "Test 2",
    mathsScore: 92,
    physicsScore: 88,
    chemistryScore: 85,
    totalScore: 265,
  },
  {
    id: "3",
    testName: "Test 3",
    mathsScore: 78,
    physicsScore: 95,
    chemistryScore: 88,
    totalScore: 261,
  },
]

export default function DashboardPage() {
  const [firstName, setFirstName] = useState<string>("")
  const [isNewTestOpen, setIsNewTestOpen] = useState(false)

  useEffect(() => {
    // Get first name from localStorage
    const storedName = localStorage.getItem("firstName")
    if (storedName) {
      setFirstName(storedName)
    }
  }, [])

  return (
    <DashboardLayout>
    <div className="flex min-h-screen">
      <DashboardSidebar openNewTest={() => setIsNewTestOpen(true)} />
      <main className="flex-1 p-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Welcome back, {firstName || "Student"}!</h1>
          <div className="grid gap-8">
            <TestResultsChart
              data={testResults.map(({ testName, mathsScore, physicsScore, chemistryScore }) => ({
                testName,
                mathsScore,
                physicsScore,
                chemistryScore,
              }))}
            />
            <TestResultsTable results={testResults} />
          </div>
        </div>
      </main>
    </div>
    <NewTestDialog isOpen={isNewTestOpen} onClose={() => setIsNewTestOpen(false)} />
    </DashboardLayout>
  )
}

