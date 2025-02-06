// MainSection.tsx
import React from "react";
import TopBar from "./TopBar";
import QuestionSection from "./QuestionSection";

const MainSection: React.FC = () => {
  // Example question data
  const question = {
    id: 1,
    image: "https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/27_Jan_Shift_1/Image_56", 
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Bar */}
      <TopBar />

      {/* Question Section */}
      <div className="flex w-full h-full p-4 overflow-auto">
        <QuestionSection question={question} />
      </div>

      {/* option section */}
      <div className="flex flex-col items-center gap-2 p-4">
      <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            >
              <span className="font-semibold">({option})</span>
              <input
                type="radio"
                name="option"
                value={option}
                className="w-5 h-5 cursor-pointer accent-blue-500"
              />
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded">Previous</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;