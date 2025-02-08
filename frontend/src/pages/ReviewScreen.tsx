import React, { useEffect } from "react";
import Sidebar from "../components/ReviewComponents/Sidebar";
import MainSection from "../components/ReviewComponents/MainSection";
import { useComparison } from "@/context/ComparisionContext";
import { useQuestions } from "@/context/QuestionStateContext";
import axios from "axios";

const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_NAME: 'user_name',
  USER_ID: 'user_id',
  USER_PHOTO: 'user_photo'
};

const ReviewScreen: React.FC = () => {
  const { setSelectedAnswers, compareAnswers } = useComparison();
  const { questions } = useQuestions();

  useEffect(() => {
    setSelectedAnswers(questions);
  }, [setSelectedAnswers, questions]);

  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      try {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        if (!token) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/solution/answer`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        compareAnswers(response.data);
      } catch (error) {
        console.error("Error fetching correct answers:", error);
      }
    };

    fetchCorrectAnswers();
  }, [compareAnswers]);

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full">
        <MainSection />
      </div>
    </div>
  );
};

export default ReviewScreen;
