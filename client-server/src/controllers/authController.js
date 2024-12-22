import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "../config/Env.js";
import UserModel from "../models/UserModel.js";
import { loginValidation } from "../validations/LoginValidation.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginValidation.validate({ email, password });
    if (error) {
      return res.status(400).json({
        status: "ERROR",
        code: 400,
        message: error.details[0].message,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "ERROR",
        code: 401,
        message: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "ERROR",
        code: 401,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "SUCCESS",
      code: 200,
      message: "You have logged in successfully.",
      result: {
        user,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      code: 500,
      message: "Internal server error.",
    });
  }
};

const SignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.getByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ email, password: hashedPassword });

    res.status(201).json({
      message: "User created",
      user: { email: user.email, id: user.id },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { Login, SignUp };
