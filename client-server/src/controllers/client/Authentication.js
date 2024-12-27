import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import query from "../../utils/Query.js";
import validation from "../../utils/Validation.js";

// Sign Up
const signUp = async (req, res) => {
  try {
    const { value, error } = validation.signUp.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const { count, record } = await query
      .table("users")
      .findOrCreate(
        { email: value.email },
        { email: value.email, password: hash.sha512(value.password) }
      );

    if (count > 0) {
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

// Login
const login = async (req, res) => {
  try {
    const { value, error } = validation.login.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const userQuery = await query.table("users").findOne({
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

// Logout
const logout = async (req, res) => {
  try {
    const { value, error } = validation.logout.validate({
      authToken: req.body.authToken,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const jwtQuery = jwt.verify(value.token);

    if (!jwtQuery) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    return res.status(http.LOGOUT_SUCCESS.code).json(http.LOGOUT_SUCCESS);
  } catch (error) {
    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { value, error } = validation.forgetPassword.validate({
      email: req.body.email,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const userQuery = await query
      .table("users")
      .findOne({ email: value.email });

    if (!userQuery) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    const resetToken = "123456";
    const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;

    const options = {
      from: "admin@quikfino.com",
      to: value.email,
      subject: "Password Reset Request",
      text: `You have requested a password reset. Use the following OTP: ${resetToken}.`,
      html: `<p>You have requested a password reset. Use the following OTP: <strong>${resetToken}</strong>.</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    const mailQuery = await mail.send(options);

    if (!mailQuery) {
      return res.status(http.NETWORK_ERROR.code).json(http.NETWORK_ERROR);
    }

    return res.status(http.OTP_SENT.code).json(http.OTP_SENT);
  } catch (error) {
    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { value, error } = validation.changePassword.validate({
      newPassword: req.body.newPassword,
      authToken: req.body.authToken,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const userAuthToken = jwt.verify(value.authToken);

    if (!userAuthToken) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    const { count, record } = await query
      .table("users")
      .findOrUpdate(
        { id: userAuthToken.id },
        { password: hash.sha512(value.newPassword) }
      );

    return res.status(http.PASSWORD_CHANGED.code).json({
      status: http.PASSWORD_CHANGED.status,
      code: http.PASSWORD_CHANGED.code,
      message: http.PASSWORD_CHANGED.message,
      result: {
        user: record,
      },
    });
  } catch (error) {
    console.log(error);

    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

export { signUp, login, logout, forgotPassword, changePassword };
