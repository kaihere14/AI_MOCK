import React, { useState } from "react";
import { Search, Bell, User, Briefcase, Building2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { interviews, updateActiveItem } = useAppContext();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Interview Scheduled",
      message: "Your interview with Google is scheduled for tomorrow at 10 AM",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "New Mock Test Available",
      message:
        "Practice your coding skills with our new algorithmic challenges",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Interview Completed",
      message:
        "Your interview with Amazon has been completed. View results now",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 4,
      title: "Reminder",
      message: "Don't forget to prepare for your upcoming Meta interview",
      time: "1 day ago",
      unread: false,
    },
  ];

  // Filter interviews based on search query
  const filteredInterviews = interviews?.filter((interview) => {
    const query = searchQuery.toLowerCase();
    return (
      interview.role?.toLowerCase().includes(query) ||
      interview.companyName?.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  const handleSearchResultClick = (interview) => {
    setSearchQuery("");
    setShowSearchResults(false);
    updateActiveItem("Interviews");
    navigate("/interviews");
  };

  return (
    <div className="w-full bg-black">
      <nav className="bg-black border-b border-gray-900 px-4 md:px-6 lg:px-10 h-16 flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer ml-14 lg:ml-0"
        >
          <img
            src="https://iili.io/KZZWvF1.png"
            alt="PrepDash Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-white text-xl font-bold tracking-tight hidden sm:block">
            PrepDash
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-2 sm:mx-3 md:mx-6">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              placeholder="Search..."
              className="w-full py-2 sm:py-2.5 pl-9 sm:pl-11 pr-3 sm:pr-4 bg-gray-900 border border-gray-800 rounded-lg text-xs sm:text-sm text-gray-400 placeholder-gray-600 focus:outline-none focus:bg-gray-850 focus:border-cyan-500 focus:text-white transition-all duration-300"
            />

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full mt-2 w-full left-0 right-0 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50 max-h-[70vh] sm:max-h-96 overflow-y-auto">
                {filteredInterviews && filteredInterviews.length > 0 ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-xs text-gray-400">
                        Found {filteredInterviews.length} result
                        {filteredInterviews.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-800">
                      {filteredInterviews
                        .slice(0, 5)
                        .map((interview, index) => (
                          <div
                            key={interview._id || interview.id || index}
                            onClick={() => handleSearchResultClick(interview)}
                            className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-5 h-5 text-cyan-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">
                                  {interview.role}
                                </p>
                                <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                                  <Building2 className="w-3 h-3" />
                                  {interview.companyName}
                                </p>
                              </div>
                              <div className="text-xs text-gray-500">
                                ${interview.salary}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {filteredInterviews.length > 5 && (
                      <div className="px-4 py-3 border-t border-gray-800 text-center">
                        <button
                          onClick={() => {
                            updateActiveItem("Interviews");
                            navigate("/interviews");
                            setSearchQuery("");
                            setShowSearchResults(false);
                          }}
                          className="text-cyan-400 text-xs hover:text-cyan-300 font-medium"
                        >
                          View All {filteredInterviews.length} Results
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Search className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No results found</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Try searching for different companies or roles
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 relative"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full border border-black"></div>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50 max-h-[70vh] sm:max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm">
                    Notifications
                  </h3>
                  <span className="text-xs text-cyan-400 cursor-pointer hover:text-cyan-300">
                    Mark all as read
                  </span>
                </div>

                <div className="divide-y divide-gray-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors ${
                        notification.unread ? "bg-gray-850" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-gray-800 text-center">
                  <button className="text-cyan-400 text-xs hover:text-cyan-300 font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
