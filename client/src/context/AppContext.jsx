import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [notes, setNotes] = useState([]);
  const [testSessions, setTestSessions] = useState([]);
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.j@email.com",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=DefaultUser&backgroundColor=b6e3f4",
    role: "user",
  });

  const updateActiveItem = (item) => {
    setActiveItem(item);
  };

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken && !refreshToken) {
        setIsLoggedIn(false);
        setIsAuthChecking(false);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = {
        ...response.data,
        avatar:
          "https://api.dicebear.com/9.x/avataaars/svg?seed=DefaultUser&backgroundColor=b6e3f4",
      };
      setIsLoggedIn(true);
      setUser(userData);
      setIsAuthChecking(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/refresh-token`,
            { token: refreshToken },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          return fetchUserData();
        } catch (refreshError) {}
      }
      setIsLoggedIn(false);
      setIsAuthChecking(false);
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
    } catch (error) {}
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
      setTestResults(response.data);
    } catch (error) {}
  };

  const fetchNotes = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes/getnotes`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNotes(response.data.notes);
    } catch (error) {}
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };
  const loadTestSession = async (testId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/test-session/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTestSessions(response.data);
    } catch (error) {
      return [];
    }
  };

  const value = {
    isLoggedIn,
    isAuthChecking,
    setIsLoggedIn,
    activeItem,
    setActiveItem,
    notes,
    setNotes,
    fetchNotes,
    updateActiveItem,
    loadTestSession,
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
    setTestSessions,
    testSessions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
