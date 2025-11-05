import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import {
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  LogOut,
  Edit,
  Camera,
  Award,
  Target,
  X,
  AlertTriangle,
} from "lucide-react";

const Profile = () => {
  const { user, setUser, interviews, fetchUserData, testResults } =
    useAppContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      await fetchUserData();
    };
    initializePage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/welcome");
  };
  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/delete`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/welcome");
    } catch (error) {}
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setDeleteConfirmation("");
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmation("");
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError("");
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/change-password`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      closePasswordModal();
      alert("Password changed successfully!");
    } catch (error) {
      setPasswordError(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-y-auto">
      <Navbar />

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 sm:pt-10 pb-10 sm:pb-20">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 lg:p-8 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name)
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Name and Email */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-400 mb-4">{user?.email || "N/A"}</p>

              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6">
                <Shield className="w-4 h-4" />
                <span className="capitalize">{user?.role || "User"}</span>
              </div>

              {/* Status Indicators */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-400 text-sm">Account Active</span>
                  {user?.isActive ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-400 text-sm">Email Verified</span>
                  {user?.isEmailVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Interviews</p>
                      <p className="text-xl font-bold text-white">
                        {interviews.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Tests Taken</p>
                      <p className="text-xl font-bold text-white">
                        {testResults.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Personal Information */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Personal Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={user?.name || ""}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  ) : (
                    <p className="text-white text-lg">{user?.name || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    Email Address
                  </label>
                  <p className="text-white text-lg">{user?.email || "N/A"}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Member Since
                  </label>
                  <p className="text-white text-lg">
                    {formatDate(user?.createdAt)}
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Last Updated
                  </label>
                  <p className="text-white text-lg">
                    {formatDate(user?.updatedAt)}
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Account Settings */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                Account Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">
                      Email Notifications
                    </p>
                    <p className="text-gray-400 text-sm">
                      Receive updates about your interviews
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-gray-400 text-sm">
                      Update your account password
                    </p>
                  </div>
                  <button
                    onClick={openPasswordModal}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-semibold"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-4 sm:p-6 min-h-[180px] sm:h-[200px] flex flex-col">
              <h3 className="text-lg font-semibold text-red-400 mb-4">
                Danger Zone
              </h3>
              <div className="flex-1 flex flex-col justify-center">
                <div>
                  <p className="text-white font-medium mb-1">Delete Account</p>
                  <p className="text-gray-400 text-sm mb-3">
                    Permanently delete your account and all data
                  </p>
                  <button
                    onClick={openDeleteModal}
                    className="w-full cursor-pointer px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors text-sm font-semibold"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-500/30 rounded-xl max-w-md w-full p-4 sm:p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-red-400">
                  Delete Account
                </h3>
              </div>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Warning Message */}
            <div className="mb-6">
              <p className="text-white font-medium mb-2">
                This action cannot be undone!
              </p>
              <p className="text-gray-400 text-sm mb-4">
                This will permanently delete your account, all your interviews,
                test results, and personal data. You will not be able to recover
                your account.
              </p>
              <p className="text-white text-sm">
                To confirm, type{" "}
                <span className="font-bold text-red-400">DELETE</span> below:
              </p>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== "DELETE"}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500 text-sm sm:text-base"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-xl max-w-md w-full p-4 sm:p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-cyan-400">
                  Change Password
                </h3>
              </div>
              <button
                onClick={closePasswordModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {passwordError}
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Old Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  New Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 characters)"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Confirm New Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm your new password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={closePasswordModal}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="flex-1 px-4 py-2.5 sm:py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isChangingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
