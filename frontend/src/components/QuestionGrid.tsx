// QuestionGrid.tsx
import React from "react";
import { useQuestions} from "../context/QuestionStateContext";

const QuestionGrid: React.FC = () => {
  const { questionStatus } = useQuestions();

  // Function to get the color based on the question state
  const getBoxColor = (state: number) => {
    switch (state) {
      case 0:
        return "bg-gray-200"; // Not visited
      case 1:
        return "bg-yellow-300"; // Marked for review
      case 2:
        return "bg-red-300"; // Visited but not attempted
      case 3:
        return "bg-green-300"; // Attempted
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="p-2 overflow-auto scroll-smooth">
      <div className="grid grid-cols-5 gap-1">
        {questionStatus.map((state, index) => (
          <div
            key={index}
            className={`h-14 w-12 flex items-center justify-center rounded-lg ${getBoxColor(state)}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGrid;