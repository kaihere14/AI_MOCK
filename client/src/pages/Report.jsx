import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Award,
  ArrowLeft,
  Calendar,
  User,
  Code,
  AlertCircle,
  Brain,
} from "lucide-react";

const Report = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { testResults, fetchTestResults, setActiveItem, fetchUserData } =
    useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);
      await fetchUserData();
      await fetchTestResults();
      setIsLoading(false);
    };
    loadResults();
  }, []);

  const reportData = testResults.find((result) => result._id === id);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading test results...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Report not found</div>
      </div>
    );
  }

  const wrongAnswers = reportData.total - reportData.correct;

  const getAreasToFocus = () => {
    const areas = [];
    const accuracy = reportData.accuracy;

    if (reportData.weakTopics && reportData.weakTopics.length > 0) {
      return reportData.weakTopics;
    }

    if (accuracy < 40) {
      areas.push("Fundamental Concepts - Review basic concepts thoroughly");
      areas.push("Time Management - Practice solving questions faster");
      areas.push("Problem-Solving Skills - Work on analytical thinking");
    } else if (accuracy < 60) {
      areas.push("Intermediate Concepts - Strengthen your understanding");
      areas.push("Practice More Questions - Increase your question bank");
      areas.push("Speed and Accuracy - Balance both aspects");
    } else if (accuracy < 80) {
      areas.push("Advanced Topics - Focus on complex problems");
      areas.push("Edge Cases - Practice tricky scenarios");
      areas.push("Consistency - Maintain regular practice");
    } else if (accuracy < 100) {
      areas.push("Minor Mistakes - Review questions you got wrong");
      areas.push("Attention to Detail - Double-check your answers");
      areas.push("Time Optimization - Try to solve faster");
    }

    return areas;
  };

  const areasToFocus = getAreasToFocus();

  return (
    <div className="w-full min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate(-1);
                setActiveItem("Dashboard");
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">
                {reportData.testType} Test Report
              </h1>
              <p className="text-gray-400 mt-1">Report ID: {id}</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
            Download PDF
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-700/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-green-400">
                {Number(reportData.accuracy).toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-300 font-medium">Overall Score</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-blue-400">
                {Number(reportData.accuracy).toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-300 font-medium">Accuracy</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400">
                {formatTime(reportData.timeTaken)}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Time Spent</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 border border-cyan-700/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-cyan-400">
                {reportData.correct}/{reportData.total}
              </span>
            </div>
            <p className="text-gray-300 font-medium">Questions</p>
          </div>
        </div>

        {/* Test Info & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Test Information */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Test Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">User ID</span>
                <span className="font-medium text-xs text-gray-300">
                  {reportData.userId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Test Type</span>
                <span className="font-medium text-cyan-400">
                  {reportData.testType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Date</span>
                <span className="font-medium text-sm">
                  {formatDate(reportData.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Duration</span>
                <span className="font-medium">
                  {formatTime(reportData.timeTaken)}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Performance Breakdown
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {reportData.correct}
                </div>
                <div className="text-gray-400 text-sm">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
                <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400">
                  {wrongAnswers}
                </div>
                <div className="text-gray-400 text-sm">Wrong Answers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyan-400" />
            Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Accuracy Visualization */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300">
                Test Accuracy
              </h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-400 bg-green-900/30">
                      {reportData.accuracy === 100
                        ? "Perfect Score!"
                        : "Great Job!"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-400">
                      {Number(reportData.accuracy).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-800">
                  <div
                    style={{ width: `${reportData.accuracy}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {reportData.correct}
                  </div>
                  <div className="text-sm text-gray-400">Correct</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-300">
                    {reportData.total}
                  </div>
                  <div className="text-sm text-gray-400">Total Questions</div>
                </div>
              </div>
            </div>

            {/* Weak Topics */}
            <div className="space-y-4 flex flex-col">
              <h3 className="text-lg font-medium text-gray-300">
                Areas to Focus
              </h3>
              {areasToFocus.length > 0 ? (
                <div className="space-y-2 flex-1">
                  {areasToFocus.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
                      <span className="text-gray-300 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 bg-green-900/10 border border-green-700/30 rounded-lg p-6 min-h-[200px]">
                  <CheckCircle2 className="w-12 h-12 text-green-400 mb-3" />
                  <p className="text-green-400 font-medium">Perfect Score!</p>
                  <p className="text-gray-400 text-sm text-center mt-2">
                    Outstanding performance! Keep up the excellent work!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Statistics */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            Test Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {((reportData.correct / reportData.total) * 100).toFixed(2)}
                    %
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">
                    Avg. Time per Question
                  </div>
                  <div className="text-2xl font-bold text-purple-400">
                    {formatTime(
                      Math.floor(reportData.timeTaken / reportData.total)
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-900/30 rounded-lg">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Performance</div>
                  <div className="text-2xl font-bold text-green-400">
                    {reportData.accuracy === 100
                      ? "Excellent"
                      : reportData.accuracy >= 80
                      ? "Very Good"
                      : reportData.accuracy >= 60
                      ? "Good"
                      : "Needs Practice"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
