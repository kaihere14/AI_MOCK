import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import AddNotes from "../components/addNotes";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Search,
  Plus,
  X,
  Trash2,
  FileText,
  Tag as TagIcon,
  Calendar,
  Edit,
  BookOpen,
  StickyNote,
} from "lucide-react";

const Notes = () => {
  const {
    notes,
    fetchNotes,
    setNotes,
    isAuthChecking,
    fetchUserData,
    setActiveItem,
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      if (!localStorage.getItem("accessToken")) {
        return;
      }

      await fetchUserData();

      if (!notes || notes.length === 0) {
        setLoading(true);
        fetchNotes().finally(() => setLoading(false));
        setActiveItem("Notes");
      }
    };

    initializePage();
  }, []);

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

  const allTags = [...new Set(notes?.flatMap((note) => note.tags || []) || [])];

  const filteredNotes = notes?.filter((note) => {
    const matchesSearch =
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      !filterTag || (note.tags && note.tags.includes(filterTag));

    return matchesSearch && matchesTag;
  });

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setEditedNote({
      title: note.title,
      content: note.content,
      tags: note.tags || [],
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setTagInput("");
    setTimeout(() => setSelectedNote(null), 300);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedNote({
      title: selectedNote.title,
      content: selectedNote.content,
      tags: selectedNote.tags || [],
    });
    setTagInput("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tagInput.trim();

      if (trimmedTag && !editedNote.tags.includes(trimmedTag)) {
        setEditedNote((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditedNote((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleUpdateNote = async () => {
    if (!editedNote.title || !editedNote.content) {
      alert("Please fill in all required fields");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes/updatenote/${
          selectedNote._id || selectedNote.id
        }`,
        {
          title: editedNote.title,
          content: editedNote.content,
          tags: editedNote.tags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Update local state
      const updatedNotes = notes.map((note) =>
        (note._id || note.id) === (selectedNote._id || selectedNote.id)
          ? { ...note, ...response.data }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({ ...selectedNote, ...response.data });
      setIsEditing(false);
      fetchNotes();
    } catch (error) {
      alert("Failed to update note. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/notes/deletenote/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Update local state
        const updatedNotes = notes.filter(
          (note) => note._id !== noteId && note.id !== noteId
        );
        setNotes(updatedNotes);
        toast.success("Note deleted successfully");
        handleCloseModal();
      } catch (error) {
        toast.error("Failed to delete note. Please try again.");
      }
    }
  };

  const handleNoteCreated = (newNote) => {
    setNotes([...notes, newNote]);
    fetchNotes();
    setShowCreateModal(false);
    toast.success("Note created successfully");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Header Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 sm:pt-10 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              My Notes
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              {filteredNotes?.length || 0} notes found
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer bg-gradient-to-r from-pink-400 to-blue-400 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-xl hover:from-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Note</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-all duration-300"
              />
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="">All Tags</option>
                {allTags.map((tag, idx) => (
                  <option key={idx} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || filterTag) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Filters applied:{" "}
                {[searchTerm && "Search", filterTag && "Tag"]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterTag("");
                }}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading notes...</p>
            </div>
          </div>
        ) : filteredNotes && filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredNotes.map((note, index) => (
              <div
                key={note._id || note.id || index}
                onClick={() => handleNoteClick(note)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(note.createdAt)}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {note.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {truncateContent(note.content)}
                </p>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {note.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="px-2 py-1 text-gray-500 text-xs">
                        +{note.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No notes found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterTag
                  ? "Try adjusting your filters"
                  : "Get started by creating your first note"}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center cursor-pointer gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add Note
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Note Details Modal */}
      {showModal && selectedNote && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? "Edit Note" : "Note Details"}
              </h2>
              <div className="flex items-center gap-2">
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
                    title="Edit Note"
                  >
                    <Edit className="w-5 h-5 text-cyan-400" />
                  </button>
                )}
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {isEditing ? (
                /* Edit Mode */
                <>
                  {/* Title Input */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editedNote.title}
                      onChange={handleInputChange}
                      placeholder="Enter note title"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Content Input */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
                      <StickyNote className="w-4 h-4 text-cyan-400" />
                      Content <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="content"
                      value={editedNote.content}
                      onChange={handleInputChange}
                      placeholder="Write your note here..."
                      rows={10}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-y"
                      required
                    />
                  </div>

                  {/* Tags Input */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-gray-400 text-sm font-semibold mb-2">
                      <TagIcon className="w-4 h-4 text-cyan-400" />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Type a tag and press Enter"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Press Enter to add a tag
                    </p>

                    {/* Display Tags */}
                    {editedNote.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {editedNote.tags.map((tag, index) => (
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
                </>
              ) : (
                /* View Mode */
                <>
                  {/* Title and Date */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {selectedNote.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Created on {formatDate(selectedNote.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {selectedNote.tags && selectedNote.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedNote.tags.map((tag, idx) => (
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

                  {/* Content */}
                  <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 text-gray-400 mb-4">
                      <StickyNote className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-semibold">Content</span>
                    </div>
                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedNote.content}
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateNote}
                      disabled={isUpdating}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Updating..." : "Update Note"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleDeleteNote(selectedNote._id || selectedNote.id)
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Note
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Note Modal */}
      {showCreateModal && (
        <AddNotes
          onClose={() => setShowCreateModal(false)}
          onNoteCreated={handleNoteCreated}
        />
      )}
    </div>
  );
};

export default Notes;
