import React from "react";
import { QuestionsProvider } from "../context/QuestionStateProvider";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
// import { AnswersProvider } from "../context/AnswerStateProvider";

const TestScreen :React.FC = ()=>{
    return(
      <QuestionsProvider totalQuestions={90}>
    <div className="flex w-screen h-screen">
        <Sidebar />
      <div className="w-full">
        <MainSection />
      </div>
    </div>
      </QuestionsProvider>
    )
}

export default TestScreen;