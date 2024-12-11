import { jwtSecret } from "../config/dbConfig.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { compare } = bcrypt;
const { sign } = jwt;

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = sign({ id: user.id }, jwtSecret, {
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
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("Username already exists");

    const user = await User.create({ email, password });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { Login, Register };
