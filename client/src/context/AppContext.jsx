import React, { createContext, useContext, useState } from "react";
import axios from "axios";

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
    const [interviews , setInterviews ] = useState([]);
    const [testResults , setTestResults ] = useState([]);
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.j@email.com",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=DefaultUser&backgroundColor=b6e3f4",
    role: "user",
  });

  // Function to update active menu item
  const updateActiveItem = (item) => {
    setActiveItem(item);
  };

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Set default avatar if user doesn't have one
      const userData = {
        ...response.data,
        avatar:"https://api.dicebear.com/9.x/avataaars/svg?seed=DefaultUser&backgroundColor=b6e3f4"
      };
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const fetchInterviews = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/interviews/getallinterviews`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

const fetchTestResults = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/test-results`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Test Results:", response.data);
      setTestResults(response.data);
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  };



  // Function to update user data
  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const value = {
    activeItem,
    setActiveItem,
    updateActiveItem,
    fetchUserData,
    fetchInterviews,
    fetchTestResults,
    testResults,
    setTestResults,
    interviews,
    setInterviews, 
    user,
    setUser,
    updateUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
