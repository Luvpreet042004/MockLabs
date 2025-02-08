import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TestResult {
  id: string
  testName: string
  mathsScore: number
  physicsScore: number
  chemistryScore: number
  totalScore: number
}

interface TestResultsTableProps {
  results: TestResult[]
}

export function TestResultsTable({ results }: TestResultsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test Name</TableHead>
          <TableHead className="text-right">Maths Score</TableHead>
          <TableHead className="text-right">Physics Score</TableHead>
          <TableHead className="text-right">Chemistry Score</TableHead>
          <TableHead className="text-right">Total Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((result) => (
          <TableRow key={result.id}>
            <TableCell className="font-medium">{result.testName}</TableCell>
            <TableCell className="text-right">{result.mathsScore}</TableCell>
            <TableCell className="text-right">{result.physicsScore}</TableCell>
            <TableCell className="text-right">{result.chemistryScore}</TableCell>
            <TableCell className="text-right">{result.totalScore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

