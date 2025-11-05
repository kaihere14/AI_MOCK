import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Brain, Code, Users } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Practice = () => {
  const [aptitudeDifficulty, setAptitudeDifficulty] = useState("Medium");
  const [codingDifficulty, setCodingDifficulty] = useState("Medium");
  const [hrDifficulty, setHrDifficulty] = useState("Medium");
  const navigate = useNavigate();
  const { fetchUserData } = useAppContext();

  useEffect(() => {
    const initializePage = async () => {
      await fetchUserData();
    };
    initializePage();
  }, []);

  const handleStartAptitude = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/create-test`,
        {
          type: "Aptitude",
          difficulty: aptitudeDifficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate(`/practice-test/${response.data.testSessionId}`);
    } catch (error) {}
  };

  const handleStartCoding = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/create-test`,
        {
          type: "Coding",
          difficulty: codingDifficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate(`/practice-test/${response.data.testSessionId}`);
    } catch (error) {}
  };

  const handleStartHR = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tests/create-test`,
        {
          type: "HR",
          difficulty: hrDifficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate(`/practice-test/${response.data.testSessionId}`);
    } catch (error) {}
  };

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-y-auto">
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 sm:pt-10 pb-10">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Choose Your Challenge
          </h1>
          <p className="text-base sm:text-lg text-gray-400">
            Select a round to start your practice session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Aptitude Round
              </h2>
            </div>

            <div className="flex-1 mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Quantitative Analysis
                </span>
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Logical Reasoning
                </span>
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Verbal Ability
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 sm:gap-3 mb-1">
                <button
                  onClick={() => setAptitudeDifficulty("Easy")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    aptitudeDifficulty === "Easy"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setAptitudeDifficulty("Medium")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    aptitudeDifficulty === "Medium"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setAptitudeDifficulty("Hard")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    aptitudeDifficulty === "Hard"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>

            <button
              onClick={handleStartAptitude}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Start Practice
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                <Code className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Coding Round
              </h2>
            </div>

            <div className="flex-1 mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Data Structures
                </span>
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Algorithms
                </span>
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  System Design
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 sm:gap-3 mb-1">
                <button
                  onClick={() => setCodingDifficulty("Easy")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    codingDifficulty === "Easy"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setCodingDifficulty("Medium")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    codingDifficulty === "Medium"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setCodingDifficulty("Hard")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    codingDifficulty === "Hard"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>

            <button
              onClick={handleStartCoding}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Start Practice
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                HR & Behavioral
              </h2>
            </div>

            <div className="flex-1 mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Behavioral Questions
                </span>
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Situational Judgement
                </span>
                <span className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs sm:text-sm rounded-lg">
                  Resume-based
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 sm:gap-3 mb-1">
                <button
                  onClick={() => setHrDifficulty("Easy")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    hrDifficulty === "Easy"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setHrDifficulty("Medium")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    hrDifficulty === "Medium"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setHrDifficulty("Hard")}
                  className={`flex-1 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${
                    hrDifficulty === "Hard"
                      ? "bg-white text-black"
                      : "bg-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>

            <button
              onClick={handleStartHR}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
