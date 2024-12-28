import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import query from "../../utils/Query.js";
import validation from "../../utils/Validation.js";

const signUp = async (req, res) => {
  try {
    const { value, error } = validation.signUp.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const find = { email: value.email };

    const create = {
      email: value.email,
      password: hash.sha512(value.password),
    };

    const userQuery = await query.table("users").findOrCreate(find, create);

    if (userQuery.count > 0) {
      return res.status(http.CONFLICT.code).json(http.CONFLICT);
    }

    return res.status(http.ACCOUNT_CREATED.code).json({
      ...http.ACCOUNT_CREATED,
      result: {
        user: userQuery.record,
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

    const find = {
      email: value.email,
      password: hash.sha512(value.password),
    };

    const userQuery = await query.table("users").findOne(find);

    if (!userQuery) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    return res.status(http.LOGIN_SUCCESS.code).json({
      ...http.LOGIN_SUCCESS,
      result: {
        user: userQuery,
        token: jwt.create(userQuery.id),
      },
    });
  } catch (error) {
    return res
      .status(http.INTERNAL_SERVER_ERROR.code)
      .json(http.INTERNAL_SERVER_ERROR);
  }
};

const logout = async (req, res) => {
  try {
    const { value, error } = validation.logout.validate({
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const jwtQuery = jwt.verify(value.auth_token);

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

const forgotPassword = async (req, res) => {
  try {
    const { value, error } = validation.forgetPassword.validate({
      email: req.body.email,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const find = { email: value.email };

    const userQuery = await query.table("users").findOne(find);

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

const changePassword = async (req, res) => {
  try {
    const { value, error } = validation.changePassword.validate({
      newPassword: req.body.newPassword,
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res.status(http.BAD_REQUEST.code).json(http.BAD_REQUEST);
    }

    const jwtQuery = jwt.verify(value.auth_token);

    if (!jwtQuery) {
      return res.status(http.UNAUTHORIZED.code).json(http.UNAUTHORIZED);
    }

    const find = { id: jwtQuery.id };

    const update = { password: hash.sha512(value.newPassword) };

    const userQuery = await query.table("users").findOrUpdate(find, update);

    return res.status(http.PASSWORD_CHANGED.code).json({
      ...http.PASSWORD_CHANGED,
      result: {
        user: userQuery.record,
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
