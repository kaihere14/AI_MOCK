import { Schema, model } from "mongoose";

export const testSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["Aptitude", "Coding", "HR"], required: true },
  questions: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: "Question" },
      userAnswer: String,
      isCorrect: Boolean,
    },
  ],
  startedAt: { type: Date, default: Date.now },
});
const testSession = model("testSession", testSchema);

const TestResultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  testType: { type: String, enum: ["Aptitude", "Coding", "HR"] },
  correct: Number,
  total: Number,
  accuracy: Number,
  timeTaken: Number,
  weakTopics: [String],
  createdAt: { type: Date, default: Date.now },
});

export const testResult = model("TestResult", TestResultSchema);

export default testSession;
