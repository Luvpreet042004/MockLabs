// types.ts
export type QuestionStatus = 0 | 1 | 2 | 3; // 0: Not visited, 1: Marked for review, 2: Visited, 3: Attempted

export interface Question {
  id: number;
  answer: number; // 0 means not selected, 1-4 are possible answers
  status: QuestionStatus;
}

export interface QuestionsContextType {
  questions: Question[];
  updateAnswer: (id: number, answer: number) => void;
  updateStatus: (id: number, status: QuestionStatus) => void;
  resetQuestions: () => void;
}