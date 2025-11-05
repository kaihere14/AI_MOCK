import Interview from "../models/interview.model.js";

export const createInterview = async (req, res) => {
  try {
    const {role, tag, location, companyName,salary} = req.body;
    const userId = req.userId; 
    if (!role || !location || !companyName || !salary) {
      return res.status(400).json({ message: "Role, location, companyName, and salary are required" });
    }
    const newInterview = new Interview({ userId, role, tag, location, companyName, salary });
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {

    res.status(500).json({ message: "Error creating interview", error  });   
  }
};

export const getInterviews = async (req, res) => {
  const userId = req.userId;
  try {
    const interviews = await Interview.find({ userId });
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interviews", error });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Interview ID is required" });
    }
    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interview", error });
  }
};


export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Interview ID is required" });
    }
    const deletedInterview = await Interview.findByIdAndDelete(id);
    if (!deletedInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting interview", error });
  }
};


