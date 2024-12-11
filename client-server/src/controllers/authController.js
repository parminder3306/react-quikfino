import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "../config/dotEnv.js";
import UserModel from "../models/userModel.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.getByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

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

export { Login, Register };
