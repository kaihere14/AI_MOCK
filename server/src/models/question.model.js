import { Schema,model } from "mongoose";

const questionSchema = new Schema({
  type: { type: String, enum: ["Aptitude", "Coding", "HR"], required: true },
  question: { type: String, required: true },
  options: [String],
  correctOption: String,
  topic: String, 
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
});

const Question = model("Question", questionSchema);



export default Question;
