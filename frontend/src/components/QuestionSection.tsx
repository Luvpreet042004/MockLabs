// QuestionSection.tsx
import React from "react";
import { useQuestions } from "../context/QuestionStateContext";

interface QuestionSectionProps {
  question: {
    id: number;
    image?: string; // URL of the question image // Array of options
  };
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ question }) => {
  const {updateStatus} = useQuestions();
  const qid = question.id;
  return (
    <div className="space-y-6">
      <div className=" flex justify-between prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Question {question.id}
        </h2>
        <button className="flex-1 px-2 max-w-30 py-3 rounded-lg font-semibold text-gray-600 transition-all bg-amber-300" onClick={()=>updateStatus(qid,1)}>Mark for Review</button>
      </div>
      {question.image && (
        <div className=" border-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={question.image}
            alt="Question"
            className="w-full max-h-96 object-contain bg-gray-50"
          />
    </div>
  )}
</div>
  );
};

export default QuestionSection;