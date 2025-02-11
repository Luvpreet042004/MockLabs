import React from "react";
import Sidebar from "../components/ReviewComponents/Sidebar";
import MainSection from "../components/ReviewComponents/MainSection";

const ReviewScreen: React.FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full">
        <MainSection />
      </div>
    </div>
  );
};

export default ReviewScreen;
