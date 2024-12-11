import { Router } from "express";
import { Login, Register } from "../controllers/authController.js";

const userRoutes = Router();

userRoutes.post("/login", Login);
userRoutes.post("/register", Register);

export default userRoutes;
