// QuestionSection.tsx
import React from "react";

interface QuestionSectionProps {
  question: {
    id: number;
    image?: string; // URL of the question image // Array of options
  };
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ question }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Question Image (if applicable) */}
      {question.image && (
        <img
          src={question.image}
          alt="Question"
          className="w-full max-h-100 object-cover mb-4 rounded-lg"
        />
      )}

    </div>
  );
};

export default QuestionSection;