import { model,Schema } from "mongoose";

const interviewSchema = new Schema({
  userId : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role : { type: String, required: true },
  tag :[ { type: String } ],
  location : { type: String, required: true },
  companyName: { type: String, required: true },
}); 

const Interview = model("Interview", interviewSchema);

export default Interview;
