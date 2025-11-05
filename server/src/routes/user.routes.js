import { Router } from "express";
import { chnagePassword, deleteUser, getUserProfile, loginUser, refreshToken, registerUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const route = Router()

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/profile", verifyJWT,getUserProfile);
route.post("/change-password", verifyJWT, chnagePassword);
route.delete("/delete", verifyJWT, deleteUser);
route.post("/refresh-token", refreshToken);

export default route;