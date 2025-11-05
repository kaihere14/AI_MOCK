import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router";
import Home from "./pages/Home";

import Sidebar from "./components/Sidebar";
import Interviews from "./pages/Interviews";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/Login";
import Report from "./pages/Report";
import Welcome from "./pages/Welcome";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import PracticeTest from "./pages/practiceTest";
import AllReports from "./pages/AllReports";
import NotFound from "./pages/NotFound";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken && !refreshToken) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();

  // Check if current path matches any defined route
  const validRoutes = [
    "/",
    "/interviews",
    "/login",
    "/welcome",
    "/practice",
    "/profile",
    "/signup",
    "/notes",
    "/allreports",
  ];
  const isValidRoute =
    validRoutes.some((route) => location.pathname === route) ||
    location.pathname.startsWith("/report/") ||
    location.pathname.startsWith("/practice-test/");

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/welcome" ||
    location.pathname === "/signup" ||
    !isValidRoute; // Hide sidebar on 404 page

  return (
    <div className="flex bg-black text-white min-h-screen w-full">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 w-full min-w-0">
        <Routes>
          {/* Public Routes - Only accessible without login */}
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<Register />} />

          {/* Protected Routes - Require authentication */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interviews"
            element={
              <ProtectedRoute>
                <Interviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report/:id"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice-test/:testId"
            element={
              <ProtectedRoute>
                <PracticeTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allreports"
            element={
              <ProtectedRoute>
                <AllReports />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
