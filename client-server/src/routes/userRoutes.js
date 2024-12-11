import { Router } from "express";
import { Login, Register } from "./Auth.js";

const userRoutes = Router();

userRoutes.post("/login", Login);
userRoutes.post("/register", Register);

export default userRoutes;
