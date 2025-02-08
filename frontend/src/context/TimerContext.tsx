import { createContext } from "react";
import { useContext } from "react";

export interface TimerContextType {
    time: number;
    formatTime: (seconds: number) => string;
  }


export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};