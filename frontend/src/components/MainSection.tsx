import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";
import QuestionSection from "./QuestionSection";
import { useQuestions } from "../context/QuestionStateContext";
import { Button } from "./ui/button";
import { useComparison } from "@/context/ComparisionContext";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { useTimer } from "@/context/TimerContext";

const MainSection: React.FC = () => {
  const {time} = useTimer()
  const { updateAnswer, updateStatus, getStatus, getAnswer, questions } = useQuestions();
  const { setComparisonResults } = useComparison();
  const navigate = useNavigate();
  const { paper, questionId } = useParams<{ paper: string; questionId: string }>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>();

  const currentQuestionId = Number(questionId) || 1;

  // Check if current question requires an integer input
  const isIntegerType = (id: number) => (
    (id >= 21 && id <= 30) || (id >= 51 && id <= 60) || (id >= 81 && id <= 90)
  );

  // Optimistic state for question data
  const [currentQuestion, setCurrentQuestion] = useState({
    id: currentQuestionId,
    image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${currentQuestionId}`,
  });

  // State for answer selection
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Load saved answer
  useEffect(() => {
    if (getStatus(currentQuestionId) === 0) {
      updateStatus(currentQuestionId, 2);
    }
    setCurrentQuestion({
      id: currentQuestionId,
      image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${currentQuestionId}`,
    });

    const savedAnswer = getAnswer(currentQuestionId);
    setSelectedAnswer(savedAnswer);
  }, [currentQuestionId, paper, getAnswer, getStatus, updateStatus]);

  // Handle answer change
  const handleAnswerChange = (option: number | null) => {
    setSelectedAnswer(option);
    if (option !== null) {
      updateStatus(currentQuestionId, 3);
      updateAnswer(currentQuestionId, option);
    } else {
      updateStatus(currentQuestionId, 2);
      updateAnswer(currentQuestionId, null);
    }
  };

  // Handle integer input
  const handleIntegerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const intValue = value === "" ? null : parseInt(value, 10);
  
    if (value === "" || (intValue)) {
      handleAnswerChange(intValue);
      if(value === "") {
        updateStatus(currentQuestionId, 2);
      }
    }
  };
  

  // Handle navigation
  const handleNavigation = (nextId: number) => {
    setSelectedAnswer(null);
    if (nextId < 1) return; // Prevent going below 1

    setCurrentQuestion({
      id: nextId,
      image: `https://res.cloudinary.com/dls4wze5d/image/upload/f_auto,q_auto/v1/papers/${paper}/Image_${nextId}`,
    });

    navigate(`/paper/${paper}/${nextId}`);
  };

  useEffect(() => {
    if (isReady) {
      navigate(`/paper/review/${paper}/1`, { replace: true });
      window.history.pushState(null, '', `/paper/review/${paper}/1`);
    }
  }, [isReady, navigate, paper]);

  const onSubmit = async () => {
    console.log("Sending questions:", questions);

    setIsLoading(true); // Step 2: Set loading state to true before API call

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        setIsLoading(false); // Reset loading state if no token
        return;
      }

      const timeTaken = 10800 - time;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/solution/compare`,
        { questions, testName: paper,timeTaken },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Compared Results:", response.data);
      setComparisonResults(response.data.results);
      localStorage.setItem("comparisonResults", JSON.stringify(response.data));
      localStorage.setItem("totalScore", response.data.totalScore);
      localStorage.setItem("mathScore", response.data.subjectScores.maths);
      localStorage.setItem("phyScore", response.data.subjectScores.physics);
      localStorage.setItem("chemScore", response.data.subjectScores.chemistry);
      localStorage.setItem("accuracy", response.data.accuracy);
      const accuracy = localStorage.getItem("accuracy");
      console.log(accuracy);

      setIsReady(true);
    } catch (error) {
      console.error("Error comparing answers:", error);
    } finally {
      setIsLoading(false); // Step 2: Set loading state to false after API call
    }
  }

  useEffect(() => {
    if (time === 0) {
      onSubmit(); // Automatically call onSubmit when timer reaches 0
    }
  });

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <TopBar />

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-8xl mx-auto w-full">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-auto transition-all duration-300 hover:shadow-xl">
          <QuestionSection question={currentQuestion} />
        </div>

        <div className="lg:w-80 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {isIntegerType(currentQuestionId) ? (
                // Render Input Box for Integer-Type Questions
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter integer answer"
                  value={selectedAnswer ?? ""}
                  onChange={handleIntegerChange}
                />
              ) : (
                // Render MCQ Options for Other Questions
                [1, 2, 3, 4].map((option) => (
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
                      onChange={() => handleAnswerChange(option)}
                      onClick={() => {
                        if (selectedAnswer === option) {
                          handleAnswerChange(null);
                        }
                      }}
                      className="w-5 h-5 cursor-pointer accent-white"
                    />
                  </label>
                ))
              )}
            </div>

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
                onClick={onSubmit}
                className="col-span-2 flex-1 py-3 rounded-lg bg-[#005FCC] hover:bg-blue-700 font-semibold text-white transition-all"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

  {isLoading && (
  <div className="fixed inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center z-50">
  <div className="space-y-4 w-80 animate-pulse">
    <Skeleton className="h-8 w-full rounded-lg" />
    <Skeleton className="h-4 w-2/3 rounded-md" />
    <Skeleton className="h-4 w-1/2 rounded-md" />

    <div className="flex flex-col items-center justify-center pt-4 space-y-3">
      <div className="relative">
        {/* Animated spinner */}
        <div className="h-14 w-14 border-4 border-primary/50 rounded-full" />
        <div className="absolute top-0 left-0 h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-[spin_0.5s_linear_infinite]" />
      </div>

      {/* Subtle loading text */}
      <p className="text-sm font-medium text-muted-foreground">
        Loading...
        <span className="ml-2 animate-pulse">...</span>
      </p>

      {/* Analyzing your answers text */}
      <p className="text-sm text-muted-foreground mt-2 animate-pulse">
        Analyzing your answers...
      </p>
    </div>
  </div>
</div>
)}
    </div>
  );
};

export default MainSection;
