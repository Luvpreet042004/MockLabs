import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestScreen from "./pages/TestScreen";
import Landing from './pages/Landing';
import AuthPage from "./pages/SignIn";
import DashboardPage from "./pages/Dashboard";
import AnalyticsPage from "./components/Dashboard/sidebar/Analytics";
import ProfilePage from "./components/Dashboard/sidebar/Profile";
import ReviewScreen from "./pages/ReviewScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/paper/:paper/:questionId" element={<TestScreen />} />
        <Route path="/paper/review/:paper/:questionId" element={<ReviewScreen />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path = "/dashboard/" element={<DashboardPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
