import { Router } from "express";
import { Login, SignUp } from "../controllers/Authentication.js";

const route = Router();

route.post("/login", Login);
route.post("/signup", SignUp);

export default route;
