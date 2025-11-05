import {Router} from 'express';
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createNote, deleteNote, getNotes, updateNote } from '../controller/notes.controller.js';




const router = Router();

router.post("/createnote", verifyJWT, createNote);
router.get("/getnotes", verifyJWT, getNotes);
router.put("/updatenote/:noteId", verifyJWT, updateNote);
router.delete("/deletenote/:noteId", verifyJWT, deleteNote);
export default router;