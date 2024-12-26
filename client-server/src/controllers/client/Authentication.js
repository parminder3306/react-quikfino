import jwt from "../../utils/JWT.js";
import http from "../../utils/Http.js";
import hash from "../../utils/Hash.js";
import mail from "../../utils/Mail.js";
import validation from "../../utils/Validation.js";
import query from "../../models/Query.js";

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

// Logout
const logout = async (req, res) => {
  try {
    const { value, error } = validation.logout.validate({
      token: req.body.token,
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

    const userQuery = await query.findOne({ email: value.email });

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
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token);

    if (!decoded) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    const userQuery = await query.findOne({ id: decoded.id });

    if (!userQuery) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    const isOldPasswordValid =
      hash.sha512(value.oldPassword) === userQuery.password;
    if (!isOldPasswordValid) {
      return res
        .status(http.FORBIDDEN.code)
        .json({ message: "Old password is incorrect." });
    }

    const hashedNewPassword = hash.sha512(value.newPassword);
    await query.update({ id: decoded.id }, { password: hashedNewPassword });

    return res.status(http.PASSWORD_CHANGED.code).json(http.PASSWORD_CHANGED);
  } catch (error) {
    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

export { signUp, login, logout, forgotPassword, changePassword };
