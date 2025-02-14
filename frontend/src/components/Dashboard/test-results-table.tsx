import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TestResult {
  id: string
  name: string
  mathScore: number
  physicsScore: number
  chemistryScore: number
  totalScore: number
  accuracy : number
}

interface TestResultsTableProps {
  results: TestResult[]
}

export function TestResultsTable({ results }: TestResultsTableProps) {
  return (
    <div className="rounded-lg overflow-hidden border">
      <Table className="border-collapse w-full">
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-6 py-4 text-gray-700 font-medium">Test Name</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-right">Maths</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-right">Physics</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-right">Chemistry</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-right">Accuracy</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-medium text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow
              key={result.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <TableCell className="px-6 py-4 font-medium text-gray-900">{result.name}</TableCell>
              <TableCell className="px-6 py-4 text-right text-gray-700">{result.mathScore}</TableCell>
              <TableCell className="px-6 py-4 text-right text-gray-700">{result.physicsScore}</TableCell>
              <TableCell className="px-6 py-4 text-right text-gray-700">{result.chemistryScore}</TableCell>
              <TableCell className="px-6 py-4 text-right font-semibold text-gray-900">{Math.floor(result.accuracy * 100)/100}%</TableCell>
              <TableCell className="px-6 py-4 text-right font-semibold text-blue-600">{result.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}