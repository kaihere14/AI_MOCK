import React from "react";
import {
  LayoutDashboard,
  Users,
  Code,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { activeItem, updateActiveItem, user } = useAppContext();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "Interviews" },
    { icon: Code, label: "Practice" },
    { icon: FileText, label: "My Notes" },
    { icon: User, label: "Profile" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Log Out" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 w-fit sticky top-0">
      <div
        className="w-64 flex flex-col"
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

        <nav className="flex-1 px-3 py-4 ">
          <button
            onClick={() => {
              updateActiveItem("Dashboard");
              navigate("/");
            }}
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
            onClick={() => {
              updateActiveItem("Interviews");
              navigate("/about");
            }}
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
            onClick={() => updateActiveItem("Practice")}
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
            onClick={() => updateActiveItem("My Notes")}
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
            onClick={() => updateActiveItem("Profile")}
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
        <div className="px-3 py-4 border-t" style={{ borderColor: "#2a2e32" }}>
          <button
            onClick={() => updateActiveItem("Settings")}
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
            onClick={() => updateActiveItem("Log Out")}
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
  );
};

export default Sidebar;
