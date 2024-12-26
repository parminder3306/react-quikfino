import jwt from "../utils/JWT.js";
import http from "../utils/Http.js";
import hash from "../utils/Hash.js";
import validation from "../utils/Validation.js";

import query from "../models/Query.js";

const signUp = async (req, res) => {
  try {
    const { value, error } = validation.signUp.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const { count, record } = await query.findOrCreate(
      { email: value.email },
      { email: value.email, password: hash.sha512(value.password) }
    );

    if (count === 1) {
      return res.status(http.CONFLICT.code).json(http.CONFLICT);
    }

    return res.status(http.ACCOUNT_CREATED.code).json({
      status: http.ACCOUNT_CREATED.status,
      code: http.ACCOUNT_CREATED.code,
      message: http.ACCOUNT_CREATED.message,
      result: {
        user: record,
      },
    });
  } catch (error) {
    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

const login = async (req, res) => {
  try {
    const { value, error } = validation.login.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const userQuery = await query.findOne({
      email: value.email,
      password: hash.sha512(value.password),
    });

    if (!userQuery) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    return res.status(http.LOGIN_SUCCESS.code).json({
      status: http.LOGIN_SUCCESS.status,
      code: http.LOGIN_SUCCESS.code,
      message: http.LOGIN_SUCCESS.message,
      result: {
        user: userQuery,
        token: jwt.create(userQuery.id),
      },
    });
  } catch (error) {
    console.log(error);

    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

const logout = async (req, res) => {};

const forgotPassword = async (req, res) => {};

const changePassword = async (req, res) => {};

export { signUp, login, logout, forgotPassword, changePassword };
