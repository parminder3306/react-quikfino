import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";

import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";
import sendResponse from "../../utils/SendResponse.js";

const signUp = async (req, res) => {
  try {
    const { value, error } = validation.signUp.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return sendResponse.error(res, http.BAD_REQUEST, {
        error: error.message,
      });
    }

    const userFind = { email: value.email };

    const createUser = {
      email: value.email,
      password: hash.sha512(value.password),
    };

    const user = await db.table("users").findOrCreate(userFind, createUser);

    if (user.count > 0) {
      return sendResponse.error(res, http.CONFLICT, {
        match: { email: value.email },
      });
    }

    return sendResponse.success(res, http.ACCOUNT_CREATED, {
      user: { ...user.record },
    });
  } catch (error) {
    return sendResponse.error(res, http.INTERNAL_SERVER_ERROR, {
      error: error.message,
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
      return sendResponse.error(res, http.BAD_REQUEST, {
        error: error.message,
      });
    }

    const userFind = {
      email: value.email,
      password: hash.sha512(value.password),
    };

    const user = await db.table("users").findOne(userFind);

    if (!user) {
      return sendResponse.error(res, http.UNAUTHORIZED, {
        no_match: { email: value.email },
      });
    }

    return sendResponse.success(res, http.LOGIN_SUCCESS, {
      user: { ...user },
      user_token: jwt.create(user.id),
    });
  } catch (error) {
    return sendResponse.error(res, http.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const { value, error } = validation.logout.validate({
      user_token: req.body.user_token,
    });

    if (error) {
      return sendResponse.error(res, http.BAD_REQUEST, {
        error: error.message,
      });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return sendResponse.error(res, http.UNAUTHORIZED, {
        no_match: { user_token: value.user_token },
      });
    }
    return sendResponse.success(res, http.LOGOUT_SUCCESS);
  } catch (error) {
    return sendResponse.error(res, http.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { value, error } = validation.forgetPassword.validate({
      email: req.body.email,
    });

    if (error) {
      return sendResponse.error(res, http.BAD_REQUEST, {
        error: error.message,
      });
    }

    const userFind = { email: value.email };

    const user = await db.table("users").findOne(userFind);

    if (!user) {
      return sendResponse.error(res, http.UNAUTHORIZED, {
        no_match: { email: value.email },
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
      return sendResponse.error(res, http.NETWORK_ERROR);
    }

    return sendResponse.error(res, http.OTP_SENT);
  } catch (error) {
    return sendResponse.error(res, http.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { value, error } = validation.changePassword.validate({
      newPassword: req.body.newPassword,
      user_token: req.body.user_token,
    });

    if (error) {
      return sendResponse.error(res, http.BAD_REQUEST, {
        error: error.message,
      });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return sendResponse.error(res, http.UNAUTHORIZED, {
        no_match: { user_token: value.user_token },
      });
    }

    const userFind = { id: userToken.user_id };

    const userUpdate = { password: hash.sha512(value.newPassword) };

    const user = await db.table("users").findOrUpdate(userFind, userUpdate);

    return sendResponse.success(res, http.PASSWORD_CHANGED, {
      user: { ...user.record },
    });
  } catch (error) {
    return sendResponse.error(res, http.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { value, error } = validation.changePassword.validate({
      newPassword: req.body.newPassword,
      user_token: req.body.user_token,
    });

    if (error) {
      return sendResponse.error(res, http.BAD_REQUEST, {
        error: error.message,
      });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return sendResponse.error(res, http.UNAUTHORIZED, {
        no_match: { user_token: value.user_token },
      });
    }

    const userFind = { id: userToken.user_id };

    const userUpdate = { password: hash.sha512(value.newPassword) };

    const user = await db.table("users").findOrUpdate(userFind, userUpdate);

    return sendResponse.success(res, http.PASSWORD_CHANGED, {
      user: { ...user.record },
    });
  } catch (error) {
    return sendResponse.error(res, http.INTERNAL_SERVER_ERROR, {
      error: error.message,
    });
  }
};

export { signUp, login, logout, forgotPassword, resetPassword, changePassword };
