import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";

import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const signUp = async (req, res) => {
  try {
    const { value, error } = validation.signUp.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const createUser = {
      email: value.email,
      password: hash.sha512(value.password),
    };

    const condition = { email: value.email };

    const user = await db.table("users").findOrCreate(createUser, condition);

    if (user.count > 0) {
      return res
        .status(http.CONFLICT.code)
        .json({ ...http.CONFLICT, details: { match: { email: value.email } } });
    }

    return res.status(http.ACCOUNT_CREATED.code).json({
      ...http.ACCOUNT_CREATED,
      result: {
        user: user.record,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const login = async (req, res) => {
  try {
    const { value, error } = validation.login.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const condition = {
      email: value.email,
      password: hash.sha512(value.password),
    };

    const user = await db.table("users").findOne(condition);

    if (!user) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { email: value.email } },
      });
    }

    return res.status(http.LOGIN_SUCCESS.code).json({
      ...http.LOGIN_SUCCESS,
      result: {
        user: user,
        auth_token: jwt.create(user.id),
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const logout = async (req, res) => {
  try {
    const { value, error } = validation.logout.validate({
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const jwtToken = jwt.verify(value.auth_token);

    if (!jwtToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    return res.status(http.LOGOUT_SUCCESS.code).json(http.LOGOUT_SUCCESS);
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { value, error } = validation.forgetPassword.validate({
      email: req.body.email,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const condition = { email: value.email };

    const user = await db.table("users").findOne(condition);

    if (!user) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { email: value.email } },
      });
    }

    // Generate a reset token (in real scenarios, this should be secure, e.g., using crypto)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // Example OTP
    const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;

    const options = {
      from: "admin@quikfino.com",
      to: value.email,
      subject: "Password Reset Request",
      text: `You have requested a password reset. Use the following OTP: ${resetToken}.`,
      html: `<p>You have requested a password reset. Use the following OTP: <strong>${resetToken}</strong>.</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    const mailSend = await mail.send(options);

    if (!mailSend) {
      return res.status(http.NETWORK_ERROR.code).json(http.NETWORK_ERROR);
    }

    return res.status(http.OTP_SENT.code).json(http.OTP_SENT);
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { value, error } = validation.changePassword.validate({
      newPassword: req.body.newPassword,
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const jwtToken = jwt.verify(value.auth_token);

    if (!jwtToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const condition = { id: jwtToken.user_id };

    const userUpdate = { password: hash.sha512(value.newPassword) };

    const user = await db.table("users").findOrUpdate(userUpdate, condition);

    return res.status(http.PASSWORD_CHANGED.code).json({
      ...http.PASSWORD_CHANGED,
      result: {
        user: user.record,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { value, error } = validation.changePassword.validate({
      newPassword: req.body.newPassword,
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const jwtToken = jwt.verify(value.auth_token);

    if (!jwtToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const condition = { id: jwtToken.user_id };

    const userUpdate = { password: hash.sha512(value.newPassword) };

    const user = await db.table("users").findOrUpdate(userUpdate, condition);

    return res.status(http.PASSWORD_CHANGED.code).json({
      ...http.PASSWORD_CHANGED,
      result: {
        user: user.record,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export { signUp, login, logout, forgotPassword, resetPassword, changePassword };
