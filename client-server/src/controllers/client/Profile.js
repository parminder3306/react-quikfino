import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const profile = async (req, res) => {
  try {
    const { value, error } = validation.profile.validate({
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_token: value.user_token } },
      });
    }

    const userFind = { id: userToken.user_id };

    const user = await db.table("users").findOne(userFind);

    if (!user) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_id: userToken.user_id } },
      });
    }

    return res.status(http.ACCOUNT_FOUND.code).json({
      ...http.ACCOUNT_FOUND,
      result: {
        user: user,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { value, error } = validation.editProfile.validate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      language: req.body.language,
      profile_image: req.body.profile_image,
      two_factor_enabled: req.body.two_factor_enabled,
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_token: value.user_token } },
      });
    }

    const userFind = { id: userToken.user_id };

    const userUpdate = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      country: value.country,
      language: value.language,
      profile_image: value.profile_image,
      two_factor_enabled: value.two_factor_enabled,
    };

    const user = await db.table("users").findOrUpdate(userFind, userUpdate);

    return res.status(http.ACCOUNT_UPDATED.code).json({
      ...http.ACCOUNT_UPDATED,
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

export { profile, editProfile };
