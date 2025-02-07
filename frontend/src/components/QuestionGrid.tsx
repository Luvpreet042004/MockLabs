import React from "react";
import { useQuestions } from "../context/QuestionStateContext";
import { useNavigate,useParams } from "react-router-dom";

const QuestionGrid: React.FC = () => {
  const navigate = useNavigate();
  const { questions } = useQuestions();
  const { paper } = useParams<{ paper: string;}>();

  // Function to get the color based on the question status
  const getBoxColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-gray-200"; // Not visited
      case 1:
        return "bg-amber-300"; // Marked for review
      case 2:
        return "bg-red-300"; // Visited but not answered
      case 3:
        return "bg-green-300"; // Answered
      default:
        return "bg-gray-200";
    }
  };

  const handleClick = (qid : number) => {
    navigate(`/paper/${paper}/${qid}`)
  }

  return (
    <div className="py-1 px-2 overflow-auto scroll-smooth">
      <div className="grid grid-cols-5 gap-1 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-5">
        {questions.map((q) => (
          <button
            key={q.id} onClick={()=>handleClick(q.id)}
            className={`flex py-0.5 items-center hover:cursor-pointer justify-center rounded-lg ${getBoxColor(q.status)}`}
          >
            {q.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionGrid;
