import React, { useState } from "react";
import { Search, Bell, User } from "lucide-react";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

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

  return (
    <div className="w-full bg-black">
      <nav className="bg-black border-b border-gray-900  p-10 px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="w-4 h-4 border-2 border-white border-r-transparent border-b-transparent rounded-full transform -rotate-45"></div>
          </div>
          <span className="text-white text-xl font-bold tracking-tight hidden sm:block">
            PrepDash
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-3 md:mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, roles..."
              className="w-full py-2.5 pl-11 pr-4 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 placeholder-gray-600 focus:outline-none focus:bg-gray-850 focus:border-cyan-500 focus:text-white transition-all duration-300"
            />
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
              <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">

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
