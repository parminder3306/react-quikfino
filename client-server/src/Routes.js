import { Router } from "express";
import { Login, Register } from "./Auth.js";

const routes = Router();

routes.post("/login", Login);
routes.post("/register", Register);

export default routes;
