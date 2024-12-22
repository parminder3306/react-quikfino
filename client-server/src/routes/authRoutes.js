import { Router } from "express";
import { Login, SignUp } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/login", Login);
authRoutes.post("/register", SignUp);

export default authRoutes;
