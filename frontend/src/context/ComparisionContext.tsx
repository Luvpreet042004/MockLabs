import { createContext, useContext} from "react";
import { Question } from "@/types";

export interface ComparisonResult {
  id: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  score : -1 | 0 | 4;
}

export interface ComparisonContextType {
  selectedAnswers: Question[];
  setSelectedAnswers: (answers:Question[]) => void;
  getComparedResult: (id : number)=> ComparisonResult;
  comparisonResults : ComparisonResult[];
  setComparisonResults : (comparisonresult : ComparisonResult[])=> void
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);


export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};