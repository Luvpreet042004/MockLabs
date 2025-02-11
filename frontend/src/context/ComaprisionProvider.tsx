import { useState, ReactNode,useEffect } from "react";
import {ComparisonContext,ComparisonResult } from "./ComparisionContext";
import { Question } from "@/types";

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Question[]>([]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);

  useEffect(() => {
    console.log("selectedAnswers (Provider):", selectedAnswers);
    console.log("comparisonResults (Provider):",comparisonResults );
  }, [selectedAnswers,comparisonResults]);

  const compareAnswers = (correctAnswers: number[]) => {
    const results = selectedAnswers.map(({ id, answer }) => ({
        id,
        selectedAnswer: answer,
        correctAnswer: correctAnswers[id - 1] ?? null, // Ensure safe access
        isCorrect: answer !== null && answer === correctAnswers[id - 1],
    }));

    console.log("Results:", results);
    if(results.length == 90){
      setComparisonResults(results);
    }
    console.log("comparisonResults :",comparisonResults);
    
};

useEffect(() => {
  console.log("Updated comparisonResults:", comparisonResults);
}, [comparisonResults]);


  const getComparedResult = (id: number): ComparisonResult => {
    const result = comparisonResults.find(result => result.id === id);
    if (!result) {
      throw new Error(`ComparisonResult with id ${id} not found`);
    }
    return result;
  };
  

  return (
    <ComparisonContext.Provider
      value={{ selectedAnswers, setSelectedAnswers, compareAnswers, getComparedResult,comparisonResults }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};


