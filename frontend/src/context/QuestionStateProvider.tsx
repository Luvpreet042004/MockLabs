import React, { useState, ReactNode } from "react";
import { QuestionsContext } from "./QuestionStateContext";
import { QuestionStatus,Question } from "../types";


export const QuestionsProvider: React.FC<{ children: ReactNode; totalQuestions: number }> = ({ children, totalQuestions = 90 }) => {
  // Function to generate initial questions
  const generateQuestions = (count: number): Question[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      answer: null,
      status: 0,
    })); 

  // State for questions
  const [questions, setQuestions] = useState<Question[]>(generateQuestions(totalQuestions));

  // Function to update an answer
  const updateAnswer = (id: number, answer: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, answer, status: 3 } : q
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

  const getStatus = (id: number): QuestionStatus | undefined => {
    return questions.find((q) => q.id === id)?.status;
  };

  const getAnswer = (id :number) : number | undefined => {
    return questions.find((q) => q.id === id)?.answer
  }

  return (
    <QuestionsContext.Provider value={{ questions, updateAnswer, updateStatus, resetQuestions,getStatus,getAnswer }}>
      {children}
    </QuestionsContext.Provider>
  );
};