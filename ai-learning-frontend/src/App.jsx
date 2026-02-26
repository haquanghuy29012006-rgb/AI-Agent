import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// --- Imports Layout & UI ---
import MainLayout from "./components/layout/MainLayout";

// --- Imports Các Trang (Pages) ---
import Login from "./pages/Login"; // Trang đăng nhập

// --- Imports Trang Student ---
import OverviewPage from "./pages/student/OverviewPage";         // Trang tổng quan
import StudentDashboard from "./pages/student/StudentDashboard"; // Trang danh sách bài học
import Library from "./pages/student/Library";                   // Thư viện (nếu tách riêng)
import Analytics from "./pages/student/Analytics";               // Trang thống kê
import AIStudySpace from "./pages/student/AIStudySpace";         // Góc học tập AI

// --- Imports Trang Teacher ---
import TeacherDashboard from "./pages/teacher/TeacherDashboard"; // Trang giáo viên


// ============================================================================
// COMPONENT: PROTECTED ROUTE (Bảo vệ route khi chưa đăng nhập)
// ============================================================================
const ProtectedRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Nếu chưa đăng nhập -> chuyển về trang login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu role mà không đúng -> đá về trang chủ
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};


// ============================================================================
// APP COMPONENT CHÍNH (Routing System)
// ============================================================================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 1. Route LOGIN: Không dùng MainLayout */}
        <Route path="/login" element={<Login />} />

        {/* ================= STUDENT ================= */}

        {/* 2. Route TRANG CHỦ: Hiển thị Tổng Quan (OverviewPage) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OverviewPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 3. Route THƯ VIỆN: Hiển thị danh sách bài học */}
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

        {/* 4. Route GÓC HỌC TẬP: Nơi Chat & Làm Quiz */}
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

        {/* 5. Route KẾT QUẢ/THỐNG KÊ */}
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

        {/* ================= TEACHER ================= */}

        {/* 6. Route GIÁO VIÊN: Upload & Quản lý */}
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