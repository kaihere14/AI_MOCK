import express from "express";
import { connectDB } from "./databases/mongo.database.js";
import "dotenv/config";

const app = express();
app.use(express.json());

const port = process.env.PORT || 4400;
import user from "./routes/user.routes.js";
import question from "./routes/question.routes.js";
import test from "./routes/test.routes.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", user);
app.use("/api/questions", question);
app.use("/api/tests", test);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
