import { verify } from "jsonwebtoken";
import { jwtSecret } from "./config/dbConfig.js";

export default (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is found, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret key
    const verified = verify(token, jwtSecret);

    // Attach the verified user to the request object
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, send a 400 Bad Request response
    res.status(400).json({ error: "Invalid or expired token." });
  }
};
