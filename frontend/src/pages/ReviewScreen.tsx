import React from "react";
import { QuestionsProvider } from "../context/QuestionStateProvider";
import Sidebar from "../components/ReviewComponents/Sidebar";
import MainSection from "../components/ReviewComponents/MainSection";


const ReviewScreen :React.FC = ()=>{
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

export default ReviewScreen;