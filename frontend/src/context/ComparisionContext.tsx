import { createContext, useContext} from "react";


export interface Answer {
  id: number;
  answer: number | null;
  status: number;
}

export interface ComparisonResult {
  id: number;
  selectedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
}

export interface ComparisonContextType {
  selectedAnswers: Answer[];
  setSelectedAnswers: (answers:Answer[]) => void;
  comparisonResults: ComparisonResult[];
  compareAnswers: (correctAnswers: number[]) => void;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);


export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
};