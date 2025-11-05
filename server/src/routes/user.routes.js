import { Router } from "express";
import { deleteUser, getUserProfile, loginUser, refreshToken, registerUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const route = Router()

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/profile", verifyJWT,getUserProfile);
route.delete("/delete", verifyJWT, deleteUser);
route.post("/refresh-token", refreshToken);

export default route;