import { Router } from "express";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createQuestion, getQuestion } from "../controller/question.controller.js";
import { getRandomValues } from "crypto";
import { verifyAdmin } from "../middlewares/adminVerify.js";
const route = Router()

route.post("/create", verifyJWT, createQuestion);
route.get("/:id", verifyJWT, verifyAdmin, getQuestion);


export default route;