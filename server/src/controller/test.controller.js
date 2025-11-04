import testSession from "../models/test.model.js";
import Question from "../models/question.model.js";
import { testResult } from "../models/test.model.js";

export const createTest = async (req, res) => {
  try {
    const { type,difficulty } = req.body;
    const userId = req.userId;
    if (!type || !difficulty) {
      return res
        .status(400)
        .json({ message: "Test type and difficulty are required." });
    }

    // Fetch questions based on type and difficulty
    const questions = await Question.find({ type, difficulty }).select(
      "-correctOption"
    );

    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for the specified criteria." });
    }

    // Create a new test session
    const newTestSession = new testSession({
      userId,
      type,
      questions: questions.map((q) => ({ questionId: q._id, userAnswer: null, isCorrect: null })),
    });

    await newTestSession.save();

    res.status(201).json({ testSessionId: newTestSession._id, newTestSession });
  } catch (error) {
    console.error("Error creating test session:", error);
    res.status(500).json({ message: "Server error",error: error.message });
  }
};




export const updateAnswer = async (req, res) => {
    const { testSessionId, questionId, userAnswer } = req.body;

    try {
        const currentSession = await testSession.findById(testSessionId);
        if (!currentSession) {
            return res.status(404).json({ message: "Test session not found." });
        }
        const question = currentSession.questions.find(q => q.questionId.toString() === questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found in test session." });
        }

        question.userAnswer = userAnswer;
        const correctQuestion = await Question.findById(questionId);
        question.isCorrect = correctQuestion.correctOption === userAnswer;
        await currentSession.save();

        res.status(200).json({ message: "Answer updated successfully.", testSession });
    } catch (error) {
        console.error("Error updating answer:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const finalizeTest = async (req, res) => {
    const { testSessionId } = req.params;
    const userId = req.userId;

    try {
        const currentSession = await testSession.findById(testSessionId);
        if (!currentSession) {
            return res.status(404).json({ message: "Test session not found." });
        }

        // Calculate results
        const totalQuestions = currentSession.questions.length;
        const correctAnswers = currentSession.questions.filter(q => q.isCorrect).length;
        const accuracy = (correctAnswers / totalQuestions) * 100;

        const testResultEntry = new testResult({
            userId: userId,
            correct: correctAnswers,
            total: totalQuestions,
            accuracy: accuracy,
            timeTaken: Date.now() - currentSession.startedAt,
            weakTopics: [], // This can be enhanced to actually calculate weak topics
            testType: currentSession.type,
        });

        await testResultEntry.save();

        res.status(200).json({ message: "Test finalized successfully.", accuracy });
    } catch (error) {
        console.error("Error finalizing test:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}