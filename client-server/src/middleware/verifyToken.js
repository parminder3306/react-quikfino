import jwt from "jsonwebtoken";
import env from "../config/Env.js";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: "ERROR",
      code: 401,
      message: "Access Denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      code: 401,
      message: "Invalid or expired token.",
    });
  }
};

export default verifyToken;
