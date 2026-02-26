import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { BookOpen, MessageSquare, BrainCircuit, ArrowLeft } from "lucide-react";
import Login from "./pages/Login";

// Layout
import MainLayout from "./components/layout/MainLayout";
import Card, { CardHeader, CardBody } from "./components/common/Card";

// Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Analytics from "./pages/student/Analytics";

// Features
import ChatBox from "./components/features/chat/ChatBox";
import QuizGenerator from "./components/features/quiz/QuizGenerator";


// ================= PROTECTED ROUTE =================
const ProtectedRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};


// ================= AI STUDY SPACE =================
const AIStudySpace = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const location = useLocation();
  const navigate = useNavigate();

  const currentDoc = location.state?.currentDoc;

  if (!currentDoc) {
    return <Navigate to="/library" replace />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => navigate("/library")}
            className="text-gray-500 text-sm flex items-center gap-1 hover:text-indigo-600 mb-1 transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại thư viện
          </button>
          <h1 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
            <BookOpen className="text-indigo-600" /> {currentDoc.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
          <Card>
            <CardHeader>
              <h3 className="font-bold text-gray-800">📖 Nội dung chính</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {currentDoc.description}
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-4 font-bold ${
                activeTab === "chat"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
            >
              <MessageSquare size={18} /> Chat
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`flex-1 py-4 font-bold ${
                activeTab === "quiz"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500"
              }`}
            >
              <BrainCircuit size={18} /> Quiz
            </button>
          </div>

          <div className="flex-1 p-4 bg-gray-50 overflow-hidden">
            {activeTab === "chat" ? (
              <ChatBox filename={currentDoc.filename} />
            ) : (
              <QuizGenerator
                filename={currentDoc.filename}
                topicName={currentDoc.title}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// ================= APP =================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* STUDENT HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StudentDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* LIBRARY */}
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StudentDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* AI LEARN */}
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AIStudySpace />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ANALYTICS */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Analytics />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute roleRequired="teacher">
              <MainLayout>
                <TeacherDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;