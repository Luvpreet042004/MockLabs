import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestScreen from "./pages/TestScreen";
import Landing from './pages/Landing';
import AuthPage from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/paper/:paper/:questionId" element={<TestScreen />} />
        <Route path="/signin" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
