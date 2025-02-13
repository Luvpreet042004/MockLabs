import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthPage from "./pages/SignIn";
import DashboardPage from "./pages/Dashboard";
import { QuestionsProvider } from "./context/QuestionStateProvider";
import { ComparisonProvider } from "./context/ComaprisionProvider";
import TestScreen from "./pages/TestScreen";
import ReviewScreen from "./pages/ReviewScreen";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

function App() {
  useEffect(()=>{
    const refreshToken = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        const newToken = await user.getIdToken(true); // Force refresh
        localStorage.setItem("authToken", newToken); // Update token
      }
    };
    refreshToken()
  })
  return (
    <Router>
      <ComparisonProvider>
        <QuestionsProvider totalQuestions={90}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/paper/:paper/:questionId" element={<TestScreen />} />
            <Route path="/paper/review/:paper/:questionId" element={<ReviewScreen />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
          </Routes>
        </QuestionsProvider>
      </ComparisonProvider>
    </Router>
  );
}

export default App;
