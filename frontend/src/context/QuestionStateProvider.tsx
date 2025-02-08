import React, { useState,useEffect, ReactNode } from "react";
import { QuestionsContext } from "./QuestionStateContext";
import { QuestionStatus,Question } from "../types";


export const QuestionsProvider: React.FC<{ children: ReactNode; totalQuestions: number }> = ({
  children,
  totalQuestions = 90,
}) => {
  // Function to generate initial questions
  const generateQuestions = (count: number): Question[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      answer: null,
      status: 0,
    }));

  // Load questions from localStorage or generate new ones
  const loadQuestions = (): Question[] => {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }
    return generateQuestions(totalQuestions);
  };

  // State for questions
  const [questions, setQuestions] = useState<Question[]>(loadQuestions());

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  // Function to update an answer
  const updateAnswer = (id: number, answer: number | null) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answer, status: 3 } : q))
    );
  };

  // Function to update a question's status
  const updateStatus = (id: number, status: QuestionStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  // Function to reset all questions
  const resetQuestions = () => {
    const newQuestions = generateQuestions(totalQuestions);
    setQuestions(newQuestions);
    localStorage.setItem('questions', JSON.stringify(newQuestions));
  };

  // Function to get the status of a question
  const getStatus = (id: number): QuestionStatus | undefined => {
    return questions.find((q) => q.id === id)?.status;
  };

  // Function to get the answer of a question
  const getAnswer = (id: number): number | null => {
    const answer = questions.find((q) => q.id === id)?.answer || null;
    return answer
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, updateAnswer, updateStatus, resetQuestions, getStatus, getAnswer }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};