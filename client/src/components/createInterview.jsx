import React, { useState } from "react";
import axios from "axios";
import { X, Briefcase, MapPin, DollarSign, Building2, Tag } from "lucide-react";

const CreateInterview = ({ onClose, onInterviewCreated }) => {
  const [formData, setFormData] = useState({
    role: "",
    companyName: "",
    salary: "",
    location: "",
    tag: "",
  });
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const trimmedTag = formData.tag.trim();

      if (trimmedTag && !tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setFormData((prev) => ({ ...prev, tag: "" }));
      } else if (trimmedTag && tags.includes(trimmedTag)) {
        setError("This tag has already been added");
        setTimeout(() => setError(""), 2000);
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validation
    if (
      !formData.role ||
      !formData.companyName ||
      !formData.salary ||
      !formData.location
    ) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/interviews/register`,
        {
          role: formData.role,
          companyName: formData.companyName,
          salary: formData.salary,
          location: formData.location,
          tag: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Success callback
      if (onInterviewCreated) {
        onInterviewCreated(response.data);
      }

      // Reset form
      setFormData({
        role: "",
        companyName: "",
        salary: "",
        location: "",
        tag: "",
      });
      setTags([]);

      // Close modal
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Error creating interview:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create interview. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Create New Interview
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Role */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Role / Position <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., Senior Frontend Developer"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          {/* Company Name */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              Company Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g., Google, Microsoft, etc."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          {/* Salary and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                Salary <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., 120000"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
              <Tag className="w-4 h-4 text-cyan-400" />
              Tags
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter (e.g., Remote, Full-time)"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Enter to add a tag
            </p>

            {/* Display Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full border border-cyan-500/30 flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-cyan-300 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Interview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInterview;
