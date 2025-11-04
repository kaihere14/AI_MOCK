import Question from "../models/question.model.js";

export const createQuestion = async (req, res) => {
  try {
    const { type, question, options, correctOption, topic, difficulty } = req.body;
    if(!type || !question || !options || !correctOption || !topic || !difficulty) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newQuestion = new Question({
        type,
        question,
        options,
        correctOption,
        topic,
        difficulty
    });
    await newQuestion.save();
    res.status(201).json({ message: 'Question created successfully', newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const { id } = req.params
    const questionId = id.split(':')[1];
    const question = await Question.findById(questionId).select('-correctOption');
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

