import { Router } from "express";
import { login, signUp } from "../controllers/Authentication.js";

const api = Router();

// Authentication
api.post("/auth/login", login);
api.post("/auth/signup", signUp);

export default api;
