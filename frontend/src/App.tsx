import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestScreen from "./pages/TestScreen";
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/paper/:paper/:questionId" element={<TestScreen />} />
        {/* <Route path="/result" element={<ResultScreen />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
