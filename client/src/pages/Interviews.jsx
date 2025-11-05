import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import InterviewCard from "../components/InterviewCard";
import CreateInterview from "../components/createInterview";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Briefcase,
  DollarSign,
  X,
  Trash2,
  MapPin,
  Clock,
  Users,
  FileText,
} from "lucide-react";

const Interviews = () => {
  const {
    interviews,
    fetchInterviews,
    setInterviews,
    isAuthChecking,
    fetchUserData,
    setActiveItem,
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterSalary, setFilterSalary] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const image = [
    "https://i.pinimg.com/736x/e1/72/ab/e172abaca6b2de1397d3cbfb0391710e.jpg",
    "https://i.pinimg.com/1200x/d4/5e/a6/d45ea667cb8cf20a42984d2847006b9e.jpg",
    "https://i.pinimg.com/736x/23/20/b3/2320b3e6fb349c0a85acfbbe2efd159b.jpg",
  ];

  useEffect(() => {
    const initializePage = async () => {
      if (!localStorage.getItem("accessToken")) {
        return; 
      }

      // If interviews are not loaded, fetch them
      if (!interviews || interviews.length === 0) {
        fetchUserData()
        setLoading(true);
        fetchInterviews().finally(() => setLoading(false));
        setActiveItem("Interviews");
      }
    };

    initializePage();
  }, []);

  // Show loading while checking authentication
  if (isAuthChecking) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Filter interviews based on search and filters
  const filteredInterviews = interviews?.filter((interview) => {
    const matchesSearch =
      interview.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || interview.role === filterRole;
    const matchesSalary =
      !filterSalary || checkSalaryRange(interview.salary, filterSalary);

    return matchesSearch && matchesRole && matchesSalary;
  });

  const checkSalaryRange = (salary, range) => {
    const salaryNum = parseInt(salary);
    switch (range) {
      case "0-50":
        return salaryNum >= 0 && salaryNum <= 50000;
      case "50-100":
        return salaryNum > 50000 && salaryNum <= 100000;
      case "100-150":
        return salaryNum > 100000 && salaryNum <= 150000;
      case "150-200":
        return salaryNum > 150000 && salaryNum <= 200000;
      case "200+":
        return salaryNum > 200000;
      default:
        return true;
    }
  };

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
        // TODO: Add API call to delete interview
        // await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/interviews/${interviewId}`);

        // Update local state
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
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Header Section */}
      <div className="px-20 pt-10 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Interviews</h1>
            <p className="text-gray-400">
              {filteredInterviews?.length || 0} interviews found
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-3 cursor-pointer bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-3 rounded-xl hover:from-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Interview
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search interviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Salary Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterSalary}
                onChange={(e) => setFilterSalary(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Packages</option>
                <option value="0-50">$0 - $50k</option>
                <option value="50-100">$50k - $100k</option>
                <option value="100-150">$100k - $150k</option>
                <option value="150-200">$150k - $200k</option>
                <option value="200+">$200k+</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || filterRole || filterDate || filterSalary) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Filters applied:{" "}
                {[
                  searchTerm && "Search",
                  filterRole && "Role",
                  filterDate && "Date",
                  filterSalary && "Salary",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterRole("");
                  setFilterDate("");
                  setFilterSalary("");
                }}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interviews List */}
      <div className="px-20 pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading interviews...</p>
            </div>
          </div>
        ) : filteredInterviews && filteredInterviews.length > 0 ? (
          <div className="space-y-4">
            {filteredInterviews.map((interview, index) => (
              <div
                key={interview._id || interview.id || index}
                onClick={() => handleInterviewClick(interview)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={interview.imageSrc || image[index % 3]}
                      alt={interview.role}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {interview.role}
                      </h3>
                      <p className="text-gray-400 mb-2">
                        {interview.companyName}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {interview.date || "15 Dec 2023"}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4" />
                          {interview.salary}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    {interview.tag && interview.tag.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {interview.tag.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No interviews found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterRole || filterDate || filterSalary
                  ? "Try adjusting your filters"
                  : "Get started by adding your first interview"}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center cursor-pointer gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add Interview
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interview Details Modal */}
      {showModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Interview Details
              </h2>
              <button
                onClick={handleCloseModal}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image and Basic Info */}
              <div className="flex gap-6 mb-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={selectedInterview.imageSrc || image[0]}
                    alt={selectedInterview.role}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedInterview.role}
                  </h3>
                  <p className="text-xl text-cyan-400 mb-3">
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

              {/* Details Grid */}
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

              {/* Description */}
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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={async () => {
                    handleDeleteInterview(
                      selectedInterview._id || selectedInterview.id
                    );
                    await axios.delete(
                      `${
                        import.meta.env.VITE_BACKEND_URL
                      }/api/interviews/deleteinterview/${
                        selectedInterview._id || selectedInterview.id
                      }`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                      }
                    );
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Interview
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Interview Modal */}
      {showCreateModal && (
        <CreateInterview
          onClose={() => setShowCreateModal(false)}
          onInterviewCreated={handleInterviewCreated}
        />
      )}
    </div>
  );
};

export default Interviews;
