import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.userId;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      userId,
      title,
      content,
      tags,
    });

    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const notes = await Note.find({ userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    await note.save();

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId;

    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
