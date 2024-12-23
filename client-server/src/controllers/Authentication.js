import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import env from "../config/Env.js";
import errors from "../config/Errors.js";
import success from "../config/Success.js";
import UserModel from "../models/UserModel.js";
import { loginValidation } from "../validations/LoginValidation.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation.validate({ email, password });
    if (error) {
      return res.status(errors.BAD_REQUEST.code).json(errors.BAD_REQUEST);
    }

    const user = await UserModel.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user && !isMatch) {
      return res.status(errors.UNAUTHORIZED.code).json(errors.UNAUTHORIZED);
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(success.LOGIN_SUCCESS.code).json({
      status: success.LOGIN_SUCCESS.status,
      code: success.LOGIN_SUCCESS.code,
      message: success.LOGIN_SUCCESS.message,
      result: {
        user,
        token,
      },
    });
  } catch (error) {
    return res
      .status(errors.INTERNAL_SERVER_ERROR.code)
      .json(errors.INTERNAL_SERVER_ERROR);
  }
};

const SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation.validate({ email, password });
    if (error) {
      return res.status(errors.BAD_REQUEST.code).json(errors.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { count, record } = await UserModel.findOrCreate(
      { email },
      { email, password: hashedPassword }
    );
    if (count === 1) {
      return res.status(errors.CONFLICT.code).json(errors.CONFLICT);
    }

    return res.status(success.ACCOUNT_CREATED.code).json({
      status: success.ACCOUNT_CREATED.status,
      code: success.ACCOUNT_CREATED.code,
      message: success.ACCOUNT_CREATED.message,
      result: {
        user: record,
      },
    });
  } catch (error) {
    return res
      .status(errors.INTERNAL_SERVER_ERROR.code)
      .json(errors.INTERNAL_SERVER_ERROR);
  }
};

export { Login, SignUp };
