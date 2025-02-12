import { useState, ReactNode,useEffect } from "react";
import {ComparisonContext,ComparisonResult } from "./ComparisionContext";
import { Question } from "@/types";

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Question[]>([]);
  // Load comparison results from localStorage or create a default empty array
const loadComparisonResults = (): ComparisonResult[] => {
  const savedResults = localStorage.getItem("comparisonResults");
  return savedResults ? JSON.parse(savedResults) : [];
};

// State for comparison results
const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>(loadComparisonResults);

// Sync with localStorage whenever comparisonResults change
useEffect(() => {
  localStorage.setItem("comparisonResults", JSON.stringify(comparisonResults));
}, [comparisonResults]);

  const getComparedResult = (id: number): ComparisonResult => {
    const result = comparisonResults[id -1];
    if (!result) {
      throw new Error(`ComparisonResult with id ${id} not found`);
    }
    return result;
  };
  

  return (
    <ComparisonContext.Provider
      value={{ selectedAnswers, setSelectedAnswers, setComparisonResults, getComparedResult,comparisonResults }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};


