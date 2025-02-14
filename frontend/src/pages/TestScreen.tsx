import React from "react";
import { QuestionsProvider } from "../context/QuestionStateProvider";
import MainSection from "../components/MainSection";
import { TimerProvider } from "@/context/TImerProvider";


const TestScreen :React.FC = ()=>{
    return(
      <TimerProvider>
      <QuestionsProvider totalQuestions={90}>
    <div className="flex w-screen h-screen">
      <div className="w-full">
        <MainSection />
      </div>
    </div>
      </QuestionsProvider>
      </TimerProvider>
    )
}

export default TestScreen;