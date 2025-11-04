import express from "express";
import { connectDB } from "./databases/mongo.database.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);

const port = process.env.PORT || 4400;
import user from "./routes/user.routes.js";
import question from "./routes/question.routes.js";
import test from "./routes/test.routes.js";
import interview from "./routes/interview.routes.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", user);
app.use("/api/questions", question);
app.use("/api/tests", test);
app.use("/api/interviews", interview);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
