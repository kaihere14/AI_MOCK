import React, { useState } from "react";
import axios from "axios";
import { X, FileText, AlignLeft, Tag } from "lucide-react";

const AddNotes = ({ onClose, onNoteCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
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
      e.preventDefault();
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

    if (!formData.title || !formData.content) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes/createnote`,
        {
          title: formData.title,
          content: formData.content,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (onNoteCreated) {
        onNoteCreated(response.data);
      }

      setFormData({
        title: "",
        content: "",
        tag: "",
      });
      setTags([]);

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Error creating note:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create note. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create New Note</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Interview Preparation Tips"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
              <AlignLeft className="w-4 h-4 text-cyan-400" />
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your note here..."
              rows={8}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-y"
              required
            />
          </div>

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
              placeholder="Type a tag and press Enter (e.g., JavaScript, React)"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Enter to add a tag
            </p>

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
              {isSubmitting ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
