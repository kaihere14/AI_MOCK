import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createTest, finalizeTest, getTestResults, updateAnswer } from "../controller/test.controller.js";
const route = Router();

route.post("/create-test", verifyJWT, createTest);
route.post("/update-answer", verifyJWT, updateAnswer);
route.post("/finalize-test/:testSessionId", verifyJWT, finalizeTest);
route.get("/test-results", verifyJWT, getTestResults);

export default route;
