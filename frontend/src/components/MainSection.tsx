import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";
import QuestionSection from "./QuestionSection";
import { useQuestions } from "../context/QuestionStateContext";
import { Button } from "./ui/button";
import { useComparison } from "@/context/ComparisionContext";
import axios from "axios";

const MainSection: React.FC = () => {
  const {updateAnswer, updateStatus,getStatus,getAnswer,questions} = useQuestions();
  const {setComparisonResults} = useComparison()
  const navigate = useNavigate();
  const { paper, questionId } = useParams<{ paper: string; questionId: string }>();
  const [isReady,setIsReady] = useState<boolean>(false);

  const currentQuestionId = Number(questionId) || 1;

  // Optimistic state for question data
  const [currentQuestion, setCurrentQuestion] = useState({
    id: currentQuestionId,
    image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${currentQuestionId}`,
  });

  // State for answer selection
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Preload next image
  // Update the useEffect to fetch the saved answer
useEffect(() => {
  if(getStatus(currentQuestionId) === 0){updateStatus(currentQuestionId,2)}
  setCurrentQuestion({
    id: currentQuestionId,
    image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${currentQuestionId}`,
  });
  
  // Fetch saved answer from context and update state
  getStatus(currentQuestionId)
  const savedAnswer = getAnswer(currentQuestionId);
  setSelectedAnswer(savedAnswer);
  // console.log("questions :",questions);
  console.log("rerender");
  
  
}, [currentQuestionId, paper, getAnswer,getStatus,updateStatus]);
  

  // Handle answer selection
  const handleAnswerChange = (option: number| null) => {
    setSelectedAnswer(option);
    
    if(option){
    updateStatus(currentQuestionId,3)
    updateAnswer(currentQuestionId,option)}
    else{
      updateStatus(currentQuestionId,2)
      updateAnswer(currentQuestionId,null)
    }
  };
 
  // Optimistic UI Update on Navigation
  const handleNavigation = (nextId: number) => {
    setSelectedAnswer(null);
    if (nextId < 1) return; // Prevent going below 1

    // Optimistically update UI
    setCurrentQuestion({
      id: nextId,
      image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${nextId}`,
    });


    // Navigate after updating UI
    navigate(`/paper/${paper}/${nextId}`);
  };

  useEffect(() => {
    if (isReady) { // Check if selectedAnswers is populated
      navigate(`/paper/review/${paper}/1`, { replace: true });
      window.history.pushState(null, '', `/paper/review/${paper}/1`);
    }
  }, [isReady,navigate,paper]); 
  
  const onSubmit = async () => {
    console.log("Sending questions:", questions);

    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("No auth token found");
            return;
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/solution/compare`, // Change API endpoint
            { questions, testName: paper }, // Send questions to backend
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log("Compared Results:", response.data);
        setComparisonResults(response.data.results); // Store the comparison results
        localStorage.setItem("comparisonResults", JSON.stringify(response.data));

        setIsReady(true); // Now it's ready to display
    } catch (error) {
        console.error("Error comparing answers:", error);
    }
};


  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
  {/* Top Bar */}
  <TopBar />

  {/* Main Content */}
  <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-8xl mx-auto w-full">
    {/* Question Section */}
    <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-auto transition-all duration-300 hover:shadow-xl">
      <QuestionSection question={currentQuestion} />
    </div>

    {/* Option Section */}
    <div className="lg:w-80  flex flex-col gap-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all
                ${
                  selectedAnswer === option 
                    ? "bg-blue-500 text-white ring-2 ring-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
            >
              <span className="font-bold text-lg">Option {option}</span>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => {handleAnswerChange(option)}}
                onClick={()=>{if(selectedAnswer == option){handleAnswerChange(null)}}}
                className="w-5 h-5 cursor-pointer accent-white"
              />
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() => handleNavigation(currentQuestionId - 1)}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all
              ${
                currentQuestionId > 1 
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            disabled={currentQuestionId === 1}
          >
            ← Previous
          </button>
          <button 
            onClick={() => handleNavigation(currentQuestionId + 1)}
            className={`flex-1 py-3 rounded-lg font-semibold text-white transition-all
              ${
                currentQuestionId < 90 
                  ? "bg-[#005FCC] hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {currentQuestionId < 90 ? "Next →" : "Finish Test"}
          </button>
          <Button 
          onClick={()=>onSubmit()}
          className=" col-span-2 flex-1 py-3 rounded-lg bg-[#005FCC] hover:bg-blue-700 font-semibold text-white transition-all">
            Submit
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default MainSection;
