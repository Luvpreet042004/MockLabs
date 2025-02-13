import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TestScore {
  id:number
  userId : number;
  name: string;
  mathScore: number;
  physicsScore: number;
  chemistryScore: number;
  accuracy: string;
  timeTaken: number;
  totalScore:number;
  createdAt: string;
}

interface TestChartProps {
  data: TestScore[];
  loading: boolean;
  err: string | null;
}

export function TestResultsChart({ data, loading, err }: TestChartProps) {
  const chartData = data;
  console.log("chatData :", chartData );
  

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gray-50 md:px-6 md:py-4 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800">Performance Overview</CardTitle>
        <CardDescription className="text-gray-600">Subject-wise score distribution</CardDescription>
      </CardHeader>
      <CardContent className="p-2 md:p-6">
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : err ? (
          <div className="text-center text-red-500">{err}</div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-600">No test results available.</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} barSize={32} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={14}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={14}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="mathScore" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={400} />
                <Bar dataKey="physicsScore" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={400} />
                <Bar dataKey="chemistryScore" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={400} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600">Maths</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-indigo-500 rounded-full" />
                <span className="text-sm text-gray-600">Physics</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-emerald-500 rounded-full" />
                <span className="text-sm text-gray-600">Chemistry</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
