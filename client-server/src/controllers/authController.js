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

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await UserModel.findOrCreate(
      { email },
      { email, password: hashedPassword }
    );
    if (existingUser) {
      return res.status(409).json({
        status: "ERROR",
        code: 409,
        message: "User details already exists.",
      });
    }

    return res.status(201).json({
      status: "SUCCESS",
      code: 201,
      message: "You have signed up successfully.",
    });
  } catch (error) {
    console.error("SignUp Error:", error.message);
    return res.status(500).json({
      status: "ERROR",
      code: 500,
      message: error.message,
    });
  }
};

export { Login, SignUp };
