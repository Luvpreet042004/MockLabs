import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const allTests = [
  {
    id: "1",
    name: "Test 1",
    date: "2024-02-08",
    totalScore: 255,
    duration: "1h 30m",
  },
  {
    id: "2",
    name: "Test 2",
    date: "2024-02-07",
    totalScore: 265,
    duration: "1h 45m",
  },
  {
    id: "3",
    name: "Test 3",
    date: "2024-02-06",
    totalScore: 261,
    duration: "1h 15m",
  },
]

export default function AllTestsPage() {
  const navigate = useNavigate()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Tests</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allTests.map((test) => (
          <Card 
            key={test.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => navigate(`/dashboard/analytics/${test.id}`)}
          >
            <CardHeader>
              <CardTitle>{test.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{test.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span>{test.totalScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{test.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

