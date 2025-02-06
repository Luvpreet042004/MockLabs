import React from "react";
import { QuestionProvider } from "../context/QuestionStateProvider";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import { AnswersProvider } from "../context/AnswerStateProvider";

const TestScreen :React.FC = ()=>{
    return(
      <QuestionProvider totalQuestions={75}>
    <div className="flex w-screen h-screen">
        <Sidebar />
      <div className="w-full">
        <AnswersProvider numberOfQuestions={75}>
        <MainSection />
        </AnswersProvider>
      </div>
    </div>
      </QuestionProvider>
    )
}

export default TestScreen;