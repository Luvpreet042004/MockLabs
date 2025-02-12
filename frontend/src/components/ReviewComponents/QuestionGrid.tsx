import React from "react";
import { useQuestions } from "../../context/QuestionStateContext";
import { useComparison } from "@/context/ComparisionContext";
import { useNavigate,useParams } from "react-router-dom";

const QuestionGrid: React.FC = () => {
  const navigate = useNavigate();
  const {comparisonResults} = useComparison();
  const { questions } = useQuestions();
  const { paper } = useParams<{ paper: string;}>();


  // Function to get the color based on the question status
  const getBoxColor = (questionId: number) => { 
    console.log("comparisionResults : ", comparisonResults);
    console.log("Typeof comparisionResults",typeof comparisonResults);
    console.log("id =1 comparisonResults",comparisonResults[0]);
    
    
    const result = comparisonResults[questionId-1];

    
    if (!result) return "bg-gray-200"; // Not attempted
    
    if (result.selectedAnswer === null) return "bg-gray-200"; // Not answered
    if (result.isCorrect) return "bg-green-300"; // Correct
    return "bg-red-300"; // Incorrect
  };

  const handleClick = (qid : number) => {
    navigate(`/paper/review/${paper}/${qid}`)
  }

  return (
    <div className="py-1 px-2 overflow-auto scroll-smooth">
      <div className="grid grid-cols-5 gap-1 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-5">
        {questions.map((q) => (
          <button
            key={q.id} onClick={()=>handleClick(q.id)}
            className={`flex py-0.5 items-center hover:cursor-pointer justify-center rounded-lg ${getBoxColor(q.id)}`}
          >
            {q.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionGrid;
