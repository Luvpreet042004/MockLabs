import React from "react";
import MainSection from "../components/ReviewComponents/MainSection";

const ReviewScreen: React.FC = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-full">
        <MainSection />
      </div>
    </div>
  );
};

export default ReviewScreen;
