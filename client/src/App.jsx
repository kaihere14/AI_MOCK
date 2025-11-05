import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/home";

import Sidebar from "./components/Sidebar";
import Interviews from "./pages/Interviews";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/login";
import Report from "./pages/Report";
import Welcome from "./pages/Welcome";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import PracticeTest from "./pages/practiceTest";
import AllReports from "./pages/AllReports";

const AppContent = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/welcome" ||
    location.pathname === "/signup";

  return (
    <div className="flex bg-black text-white min-h-screen w-full">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 w-full min-w-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/practice-test/:testId" element={<PracticeTest />} />
          <Route path="/allreports" element={<AllReports />} />
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
