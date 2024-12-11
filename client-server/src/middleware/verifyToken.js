import { verify } from "jsonwebtoken";
import env from "../config/dotEnv.js";

export default (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    req.user = verify(token, env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token." });
  }
};
