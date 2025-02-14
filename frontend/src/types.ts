// types.ts
export type QuestionStatus = 0 | 1 | 2 | 3; // 0: Not visited, 1: Marked for review, 2: Visited, 3: Attempted

export interface Question {
  id: number;
  answer: number | null;
  status: QuestionStatus;
}

export interface QuestionsContextType {
  questions: Question[];
  updateAnswer: (id: number, answer: number | null) => void;
  updateStatus: (id: number, status: QuestionStatus) => void;
  resetQuestions: () => void;
  getStatus : (id : number)=>QuestionStatus | undefined;
  getAnswer : (id : number)=>number | null;
}

export interface TestScore {
  id:number
  userId : number;
  name: string;
  mathScore: number;
  physicsScore: number;
  chemistryScore: number;
  accuracy: string;
  timeTaken: number;
  totalScore:number;
  createdAt: string;
}