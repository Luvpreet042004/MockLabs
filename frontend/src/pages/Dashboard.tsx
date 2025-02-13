import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardSidebar } from "../components/Dashboard/dashboard-sidebar";
import { TestResultsChart } from "../components/Dashboard/test-results-chart";
import { TestResultsTable } from "../components/Dashboard/test-results-table";
import DashboardLayout from "../components/Dashboard/layout";
import { NewTestDialog } from "@/components/Dashboard/sidebar/New_test_Modal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Routes,Route } from "react-router-dom";
import ProfilePage from "../components/Dashboard/sidebar/Profile";
import AnalyticsPage from "@/components/Dashboard/sidebar/Analytics";
import { Menu } from "lucide-react";


export default function DashboardPage() {
  const firstName = localStorage.getItem("userName")?.split(' ')[0];
  const [isNewTestOpen, setIsNewTestOpen] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Handle screen resize to collapse sidebar on screens < 1024px
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1024); // Collapse when screen is less than 1024px
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }
  
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTestResults(response.data.test);
        localStorage.setItem("testResults", JSON.stringify(response.data.test));
      } catch (error: any) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  

  return (
    <DashboardLayout>
      <div className="flex h-screen w-full bg-gray-100">
        {/* Fixed Sidebar */}
        <button
        className={`lg:hidden fixed top-3 left-4 z-50 text-white p-2 rounded ${
          isCollapsed ? "bg-black" : "bg-transparent"
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-6 w-6" />
      </button>
        <div className={`h-full fixed lg:flex z-10 lg:relative top-0 left-0 bg-white shadow-md border-r ${isCollapsed?"hidden":"flex"}`}>
          <DashboardSidebar openNewTest={() => setIsNewTestOpen(true)} isCollapsed={isCollapsed} />
        </div>

        {/* Main Content - Allow scrolling */}
        <main className="flex-1 overflow-y-auto p-2 lg:p-8 bg-white shadow-md rounded-lg">
        <Routes>
          <Route path='/' element={
            <div className="flex flex-col gap-8">
              <div className="space-y-1">
                <h1 className="text-4xl text-center lg:text-left font-bold text-gray-900">
                  Welcome back, {firstName || "Student"}!
                </h1>
                <p className="text-lg text-center lg:text-left text-gray-600">
                  Here's your latest performance overview
                </p>
              </div>
  
              {/* Loading and Error Handling */}
              {loading ? (
                <p className="text-center text-lg font-semibold text-gray-700">Loading test results...</p>
              ) : err ? (
                <p className="text-center text-lg font-semibold text-red-600">Error: {err}</p>
              ) : (
                <div className="grid gap-8 w-full">
                  <TestResultsChart data={testResults} loading={loading} err={err} />
                  <Card className="shadow-lg w-full border border-gray-200 rounded-lg">
                    <CardHeader className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        Recent Test Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="lg:p-6">
                      <TestResultsTable results={testResults} />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          } />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </main>
      </div>
      <NewTestDialog isOpen={isNewTestOpen} onClose={() => setIsNewTestOpen(false)} />
    </DashboardLayout>
  );
}
