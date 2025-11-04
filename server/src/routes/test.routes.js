import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createTest, finalizeTest, updateAnswer } from "../controller/test.controller.js";
const route = Router();

route.post("/create-test", verifyJWT, createTest);
route.post("/update-answer", verifyJWT, updateAnswer);
route.post("/finalize-test/:testSessionId", verifyJWT, finalizeTest);

export default route;
