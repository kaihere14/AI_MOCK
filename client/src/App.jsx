import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/home";

import Sidebar from "./components/Sidebar";
import Interviews from "./pages/Interviews";
import { AppProvider } from "./context/AppContext";
import Login from "./pages/login";

const App = () => {
  return (
    <AppProvider>
      <div className="flex bg-black text-white h-full">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AppProvider>
  );
};

export default App;
