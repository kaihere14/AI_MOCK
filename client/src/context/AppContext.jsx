import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.j@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    role: "user",
  });

  // Function to update active menu item
  const updateActiveItem = (item) => {
    setActiveItem(item);
  };

  // Function to update user data
  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const value = {
    activeItem,
    setActiveItem,
    updateActiveItem,
    user,
    setUser,
    updateUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
