import React, { useState, ReactNode } from "react";
import { QuestionsContext } from "./QuestionStateContext";
import { QuestionStatus,Question } from "../types";


export const QuestionsProvider: React.FC<{ children: ReactNode; totalQuestions: number }> = ({ children, totalQuestions }) => {
  // Function to generate initial questions
  const generateQuestions = (count: number): Question[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      answer: 0,
      status: 0,
    }));

  // State for questions
  const [questions, setQuestions] = useState<Question[]>(generateQuestions(totalQuestions));

  // Function to update an answer
  const updateAnswer = (id: number, answer: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, answer, status: 1 } : q
      )
    );
  };

  // Function to update a question's status
  const updateStatus = (id: number, status: QuestionStatus) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status } : q
      )
    );
  };

  // Function to reset all questions
  const resetQuestions = () => {
    setQuestions(generateQuestions(totalQuestions));
  };

  return (
    <QuestionsContext.Provider value={{ questions, updateAnswer, updateStatus, resetQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};