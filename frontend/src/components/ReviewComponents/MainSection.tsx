import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";
import QuestionSection from "./QuestionSection";
import { useQuestions } from "../../context/QuestionStateContext";
import { useComparison } from "../../context/ComparisionContext"; // Import the useComparison hook

const MainSection: React.FC = () => {
  const { updateAnswer, updateStatus, getStatus, getAnswer } = useQuestions();
  const { getComparedResult } = useComparison(); // Use the useComparison hook
  const navigate = useNavigate();
  const { paper, questionId } = useParams<{ paper: string; questionId: string }>();

  const currentQuestionId = Number(questionId) || 1;

  // Optimistic state for question data
  const [currentQuestion, setCurrentQuestion] = useState({
    id: currentQuestionId,
    image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${currentQuestionId}`,
  });

  // State for answer selection
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const comparedResult = getComparedResult(currentQuestionId);
  // Preload next image
  // Update the useEffect to fetch the saved answer
  useEffect(() => {
    if (getStatus(currentQuestionId) === 0) { updateStatus(currentQuestionId, 2) }
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

  }, [currentQuestionId, paper, getAnswer, getStatus, updateStatus,getComparedResult]);

  // Handle answer selection
  const handleAnswerChange = (option: number | null) => {
    setSelectedAnswer(option);

    if (option) {
      updateStatus(currentQuestionId, 3)
      updateAnswer(currentQuestionId, option)
    } else {
      updateStatus(currentQuestionId, 2)
      updateAnswer(currentQuestionId, null)
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
    navigate(`/paper/review/${paper}/${nextId}`);
  };

  // Get the comparison result for the current question

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
              {[1, 2, 3, 4].map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = comparedResult.correctAnswer === option;
                const isIncorrect = isSelected && !isCorrect;

                return (
                  <label
                    key={option}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all
                      ${
                        isSelected && isCorrect
                          ? "bg-green-500 text-white ring-2 ring-green-200"
                          : isIncorrect
                          ? "bg-red-500 text-white ring-2 ring-red-200"
                          : isCorrect
                          ? "bg-green-500 text-white ring-2 ring-green-200"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    <span className="font-bold text-lg">Option {option}</span>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={isSelected}
                      onChange={() => { handleAnswerChange(option) }}
                      onClick={() => { if (selectedAnswer == option) { handleAnswerChange(null) } }}
                      className="w-5 h-5 cursor-pointer accent-white"
                    />
                  </label>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;