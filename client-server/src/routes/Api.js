import { Router } from "express";
import { Login, SignUp } from "../controllers/Authentication.js";

const route = Router();

route.post("auth/login", Login);
route.post("auth/signup", SignUp);

export default route;
