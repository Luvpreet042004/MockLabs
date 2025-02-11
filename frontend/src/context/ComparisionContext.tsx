import { createContext, useContext} from "react";
import { Question } from "@/types";

export interface ComparisonResult {
  id: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
}

export interface ComparisonContextType {
  selectedAnswers: Question[];
  setSelectedAnswers: (answers:Question[]) => void;
  getComparedResult: (id : number)=> ComparisonResult;
  compareAnswers: (correctAnswers: number[]) => void;
  comparisonResults : ComparisonResult[];
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);


export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};