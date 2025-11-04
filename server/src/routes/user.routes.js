import { Router } from "express";
import { getUserProfile, loginUser, registerUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const route = Router()

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/profile", verifyJWT,getUserProfile);

export default route;