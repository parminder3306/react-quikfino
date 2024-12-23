import { Router } from "express";
import { Login, SignUp } from "../controllers/Authentication.js";

const api = Router();

api.post("/auth/login", Login);
api.post("/auth/signup", SignUp);

export default api;
