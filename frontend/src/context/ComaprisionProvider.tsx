import { useState, ReactNode } from "react";
import { Answer,ComparisonContext,ComparisonResult } from "./ComparisionContext";

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>(
    []
  );

  const compareAnswers = (correctAnswers: number[]) => {
    const results = selectedAnswers.map(({ id, answer }, index) => ({
      id,
      selectedAnswer: answer,
      correctAnswer: correctAnswers[index],
      isCorrect: answer === correctAnswers[index],
    }));

    setComparisonResults(results);
  };

  return (
    <ComparisonContext.Provider
      value={{ selectedAnswers, setSelectedAnswers, compareAnswers, comparisonResults }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};


