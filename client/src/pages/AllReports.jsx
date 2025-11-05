import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  Target,
  Calendar,
  TrendingUp,
  ChevronRight,
  Brain,
  Code,
  Users,
} from "lucide-react";

const AllReports = () => {
  const { testResults, fetchTestResults, fetchUserData, setActiveItem } =
    useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      await fetchUserData();
      await fetchTestResults();
      setIsLoading(false);
    };
    loadReports();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getTestIcon = (testType) => {
    switch (testType) {
      case "Aptitude":
        return <Brain className="w-6 h-6 text-cyan-400" />;
      case "Coding":
        return <Code className="w-6 h-6 text-cyan-400" />;
      case "HR":
        return <Users className="w-6 h-6 text-cyan-400" />;
      default:
        return <FileText className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80)
      return "text-green-400 bg-green-500/20 border-green-500/30";
    if (accuracy >= 60)
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    return "text-red-400 bg-red-500/20 border-red-500/30";
  };

  const handleReportClick = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 sm:pt-10 pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Test Reports
          </h1>
          <p className="text-base sm:text-lg text-gray-400">
            View all your past test results and performance history
          </p>
        </div>

        {/* Reports Grid */}
        {testResults && testResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...testResults]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((report) => (
                <div
                  key={report._id}
                  onClick={() => handleReportClick(report._id)}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 cursor-pointer group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/30">
                        {getTestIcon(report.testType)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                          {report.testType} Test
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(report.createdAt)}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  {/* Accuracy Badge */}
                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${getAccuracyColor(
                        report.accuracy
                      )}`}
                    >
                      <Target className="w-4 h-4" />
                      <span className="text-2xl font-bold">
                        {Number(report.accuracy).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        Questions
                      </span>
                      <span className="text-white font-semibold">
                        {report.correct}/{report.total}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        Time Taken
                      </span>
                      <span className="text-white font-semibold">
                        {formatTime(report.timeTaken)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${report.accuracy}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center max-w-md">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Reports Yet
              </h3>
              <p className="text-gray-400 mb-6">
                Complete practice tests to see your performance reports here
              </p>
              <button
                onClick={() => {
                  navigate("/practice");
                  setActiveItem("Practice");
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300"
              >
                Start Practice Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReports;
