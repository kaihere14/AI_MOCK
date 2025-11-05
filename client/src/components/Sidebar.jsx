import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Code,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { activeItem, updateActiveItem, user } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    updateActiveItem("Dashboard");
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleMenuClick = (label, path) => {
    updateActiveItem(label);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 left-4 z-50 w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-50 z-40 lg:z-10 shrink-0 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div
          className="w-64 flex flex-col h-screen overflow-y-auto"
          style={{ backgroundColor: "#111618" }}
        >
          <div className="p-6 border-b" style={{ borderColor: "#2a2e32" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-normal text-white truncate">{user.name}</h3>
                <p
                  className="text-sm text-white truncate"
                  style={{ opacity: 0.7 }}
                >
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <button
              onClick={() => handleMenuClick("Dashboard", "/")}
              className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeItem === "Dashboard"
                  ? "text-white"
                  : "text-white hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeItem === "Dashboard" ? "#1e2327" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeItem !== "Dashboard")
                  e.currentTarget.style.backgroundColor = "#1e2327";
              }}
              onMouseLeave={(e) => {
                if (activeItem !== "Dashboard")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <LayoutDashboard size={20} />
              <span className="font-normal">Dashboard</span>
            </button>

            <button
              onClick={() => handleMenuClick("Interviews", "/interviews")}
              className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeItem === "Interviews"
                  ? "text-white"
                  : "text-white hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeItem === "Interviews" ? "#1e2327" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeItem !== "Interviews")
                  e.currentTarget.style.backgroundColor = "#1e2327";
              }}
              onMouseLeave={(e) => {
                if (activeItem !== "Interviews")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Users size={20} />
              <span className="font-normal">Interviews</span>
            </button>

            <button
              onClick={() => handleMenuClick("Practice", "/practice")}
              className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeItem === "Practice"
                  ? "text-white"
                  : "text-white hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeItem === "Practice" ? "#1e2327" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeItem !== "Practice")
                  e.currentTarget.style.backgroundColor = "#1e2327";
              }}
              onMouseLeave={(e) => {
                if (activeItem !== "Practice")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <Code size={20} />
              <span className="font-normal">Practice</span>
            </button>

            <button
              onClick={() => handleMenuClick("My Notes", "/notes")}
              className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeItem === "My Notes"
                  ? "text-white"
                  : "text-white hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeItem === "My Notes" ? "#1e2327" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeItem !== "My Notes")
                  e.currentTarget.style.backgroundColor = "#1e2327";
              }}
              onMouseLeave={(e) => {
                if (activeItem !== "My Notes")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FileText size={20} />
              <span className="font-normal">My Notes</span>
            </button>

            <button
              onClick={() => handleMenuClick("Profile", "/profile")}
              className={`w-full flex items-center cursor-pointer gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                activeItem === "Profile"
                  ? "text-white"
                  : "text-white hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeItem === "Profile" ? "#1e2327" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeItem !== "Profile")
                  e.currentTarget.style.backgroundColor = "#1e2327";
              }}
              onMouseLeave={(e) => {
                if (activeItem !== "Profile")
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <User size={20} />
              <span className="font-normal">Profile</span>
            </button>
          </nav>

          {/* Bottom Menu */}
          <div
            className="px-3 py-4 border-t"
            style={{ borderColor: "#2a2e32" }}
          >
            <button
              onClick={() => {
                updateActiveItem("Settings");
                setIsMobileMenuOpen(false);
              }}
              className="w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-lg mb-1 text-white hover:text-white transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e2327")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <Settings size={20} />
              <span className="font-normal">Settings</span>
            </button>

            <button
              onClick={() => handleLogout()}
              className="w-full cursor-pointer flex items-center gap-3 px-3 py-3 rounded-lg mb-1 text-white hover:text-white transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1e2327")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <LogOut size={20} />
              <span className="font-normal">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
