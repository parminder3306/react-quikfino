import jsonwebtoken from "jsonwebtoken";
import env from "../config/Env.js";

const jwt = {
  create: (userId) => {
    return jsonwebtoken.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn: "1h",
    });
  },

  verify: (token) => {
    try {
      return jsonwebtoken.verify(token, env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
};

export default jwt;
