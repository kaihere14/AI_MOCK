
import { createInterview, getInterviews, getInterviewById, deleteInterview } from "../controller/interview.controller.js";
import express from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";


const router = express.Router();

router.post("/register", verifyJWT, createInterview);
router.get("/getallinterviews", verifyJWT, getInterviews);
router.get("/getinterview/:id", verifyJWT, getInterviewById);
router.delete("/deleteinterview/:id", verifyJWT, deleteInterview);

export default router;
