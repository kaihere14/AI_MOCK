import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/home";

import Sidebar from "./components/Sidebar";
import Interviews from "./pages/Interviews";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/login";
import Report from "./pages/Report";

const AppContent = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="flex bg-black text-white h-full">
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report/:id" element={<Report />} />
      </Routes>
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
