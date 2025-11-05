import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import InterviewCard from "../components/InterviewCard";
import CreateInterview from "../components/createInterview";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  X,
  Trash2,
  MapPin,
  Clock,
  Users,
  FileText,
  DollarSign,
  Calendar,
} from "lucide-react";

const Home = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const navigate = useNavigate();
  const {
    isLoggedIn,
    isAuthChecking,
    fetchUserData,
    fetchInterviews,
    interviews,
    fetchTestResults,
    testResults,
    updateActiveItem,
    setInterviews,
  } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      await fetchUserData();
      if (!localStorage.getItem("accessToken")) {
        navigate("/welcome");
      } else {
        fetchInterviews();
        fetchTestResults();
      }
    };

    checkAuth();
  }, []);

  if (isAuthChecking) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return navigate("/welcome");
  }

  const image = [
    "https://i.pinimg.com/736x/e1/72/ab/e172abaca6b2de1397d3cbfb0391710e.jpg",
    "https://i.pinimg.com/1200x/d4/5e/a6/d45ea667cb8cf20a42984d2847006b9e.jpg",
    "https://i.pinimg.com/736x/23/20/b3/2320b3e6fb349c0a85acfbbe2efd159b.jpg",
  ];

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedInterview(null), 300);
  };

  const handleDeleteInterview = async (interviewId) => {
    if (window.confirm("Are you sure you want to delete this interview?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/interviews/deleteinterview/${
            selectedInterview._id || selectedInterview.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const updatedInterviews = interviews.filter(
          (interview) =>
            interview._id !== interviewId && interview.id !== interviewId
        );
        setInterviews(updatedInterviews);
        handleCloseModal();
      } catch (error) {
        console.error("Error deleting interview:", error);
        alert("Failed to delete interview. Please try again.");
      }
    }
  };

  const handleInterviewCreated = (newInterview) => {
    setInterviews([...interviews, newInterview]);
    fetchInterviews();
  };

  return (
    <div className="w-full min-h-screen overflow-y-auto">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-6 sm:pt-10 px-4 sm:px-6 md:px-10 lg:px-20 gap-4 sm:gap-6">
        <Card
          title="Recent Interviews"
          count={interviews?.length}
          buttonText="View All"
          buttonLink="/interviews"
        />
        <Card
          title="Upcoming Mock"
          count={new Date().toLocaleDateString()}
          buttonText="View Schedule"
          buttonLink="/schedule"
        />
        <Card
          title="Latest Score"
          count={
            `${testResults?.[testResults.length - 1]?.accuracy || 0} % ` ||
            "N/A"
          }
          buttonText="View Report"
          buttonLink={`/report/${testResults?.[testResults.length - 1]?._id}`}
        />
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 sm:pt-10 pb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="left">
            <h1 className="text-xl sm:text-2xl font-medium">My Interviews</h1>
          </div>
          <div className="right w-full sm:w-auto">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto flex cursor-pointer items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-4 sm:px-8 py-2.5 sm:py-2 rounded-xl hover:from-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Interview</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
          <select className="w-full sm:w-auto px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:text-white transition-all duration-300 cursor-pointer">
            <option value="">All Roles</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Engineer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="software">Software Engineer</option>
            <option value="devops">DevOps Engineer</option>
            <option value="data">Data Scientist</option>
          </select>

          <select className="w-full sm:w-auto px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:text-white transition-all duration-300 cursor-pointer">
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <select className="w-full sm:w-auto px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:text-white transition-all duration-300 cursor-pointer">
            <option value="">All Packages</option>
            <option value="0-50">$0 - $50k</option>
            <option value="50-100">$50k - $100k</option>
            <option value="100-150">$100k - $150k</option>
            <option value="150-200">$150k - $200k</option>
            <option value="200+">$200k+</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap px-4 sm:px-6 md:px-10 lg:px-20 gap-4 sm:gap-6 lg:gap-10 mb-6">
        {interviews && interviews.length === 0 && (
          <p className="text-gray-400">No interviews found.</p>
        )}
        {interviews &&
          interviews
            .slice(0, 3)
            .map((interview, index) => (
              <InterviewCard
                key={interview.id}
                imageSrc={interview.imageSrc || image[index]}
                title={interview.role}
                company={interview.companyName}
                date={interview.date || "15 Dec 2023"}
                salary={`$${interview.salary}`}
                tags={interview.tag}
                onClick={() => handleInterviewClick(interview)}
              />
            ))}
      </div>

      {interviews && interviews.length > 3 && (
        <div className="flex justify-center px-4 pb-10">
          <button
            onClick={() => {
              navigate("/interviews");
              updateActiveItem("Interviews");
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm"
          >
            View All Interviews
          </button>
        </div>
      )}

      {showModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 sm:p-6 flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-white">
                Interview Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={selectedInterview.imageSrc || image[0]}
                    alt={selectedInterview.role}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {selectedInterview.role}
                  </h3>
                  <p className="text-lg sm:text-xl text-cyan-400 mb-3">
                    {selectedInterview.companyName}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterview.tag &&
                      selectedInterview.tag.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Salary</span>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    ${selectedInterview.salary}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 text-gray-400 mb-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {selectedInterview.date || "15 Dec 2023"}
                  </p>
                </div>

                {selectedInterview.location && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Location</span>
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {selectedInterview.location}
                    </p>
                  </div>
                )}

                {selectedInterview.duration && (
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {selectedInterview.duration}
                    </p>
                  </div>
                )}

                {selectedInterview.interviewers && (
                  <div className="bg-gray-800 rounded-lg p-4 md:col-span-2">
                    <div className="flex items-center gap-3 text-gray-400 mb-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm">Interviewers</span>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {selectedInterview.interviewers}
                    </p>
                  </div>
                )}
              </div>

              {selectedInterview.description && (
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-400 mb-3">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-semibold">Description</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedInterview.description}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() =>
                    handleDeleteInterview(
                      selectedInterview._id || selectedInterview.id
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Delete Interview
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateInterview
          onClose={() => setShowCreateModal(false)}
          onInterviewCreated={handleInterviewCreated}
        />
      )}
    </div>
  );
};

export default Home;
