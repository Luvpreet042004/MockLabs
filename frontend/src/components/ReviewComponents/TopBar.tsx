import React, { useEffect, useState } from "react";
import { UserIcon, HomeIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const userImage = localStorage.getItem("userPhoto");
  const userName = localStorage.getItem("userName");
  const {paper} = useParams<{paper:string;}>()
  

  // State for scores
  const [scores, setScores] = useState({
    totalScore: 0,
    mathScore: 0,
    phyScore: 0,
    chemScore: 0,
    accuracy: "",
  });

  // Fetch values from localStorage on mount
  useEffect(() => {
    setScores({
      totalScore: Number(localStorage.getItem("totalScore")) || 0,
      mathScore: Number(localStorage.getItem("mathScore")) || 0,
      phyScore: Number(localStorage.getItem("phyScore")) || 0,
      chemScore: Number(localStorage.getItem("chemScore")) || 0,
      accuracy: localStorage.getItem("accuracy") || "",
    });
  }, []);

  const homeHandler = () => {
    navigate("/dashboard", { replace: true });
    localStorage.removeItem("accuracy")
    localStorage.removeItem("chemScore")
    localStorage.removeItem("comparisonResults")
    localStorage.removeItem("mathScore")
    localStorage.removeItem("phyScore")
    localStorage.removeItem("questions")
    localStorage.removeItem("timer")
    localStorage.removeItem("totalScore")
    window.history.pushState(null, "/dashboard/");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg sticky top-0 z-10">
  {/* User Info */}
  <div className="flex items-center gap-4 mb-4 sm:mb-0">
    <div className="p-2 bg-white/10 rounded-lg">
    {userImage ? (
            <img
              src={userImage}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="h-6 w-6" />
          )}
    </div>
    <div className="flex flex-col">
      <span className="font-semibold">{userName}</span>
      <span className="text-sm text-gray-300">JEE Main - {paper}</span>
    </div>
  </div>

  {/* Score Display */}
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-white/10 px-4 py-2 rounded-lg mb-4 sm:mb-0">
    <div className="flex flex-col text-center">
      <span className="text-xs text-gray-300">Total Score</span>
      <span className="font-semibold text-lg">{scores.totalScore}</span>
    </div>
    <div className="flex flex-col text-center">
      <span className="text-xs text-gray-300">Math</span>
      <span className="font-semibold">{scores.mathScore}</span>
    </div>
    <div className="flex flex-col text-center">
      <span className="text-xs text-gray-300">Physics</span>
      <span className="font-semibold">{scores.phyScore}</span>
    </div>
    <div className="flex flex-col text-center">
      <span className="text-xs text-gray-300">Chemistry</span>
      <span className="font-semibold">{scores.chemScore}</span>
    </div>
    <div className="flex flex-col text-center">
      <span className="text-xs text-gray-300">Accuracy</span>
      <span className="font-semibold">{scores.accuracy}</span>
    </div>
  </div>

  {/* Home Button */}
  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 hover:cursor-pointer rounded-full">
    <HomeIcon onClick={homeHandler} className="h-5 w-5" />
  </div>
</div>
  );
};

export default TopBar;
