import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import query from "../../utils/Query.js";
import validation from "../../utils/Validation.js";

const profile = async (req, res) => {
  try {
    const { value, error } = validation.profile.validate({
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const jwtQuery = jwt.verify(value.auth_token);

    if (!jwtQuery) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const find = {
      id: jwtQuery.user_id,
    };

    const userQuery = await query.table("users").findOne(find);

    if (!userQuery) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_id: jwtQuery.user_id } },
      });
    }

    return res.status(http.ACCOUNT_FOUND.code).json({
      ...http.ACCOUNT_FOUND,
      result: {
        user: userQuery,
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
      currency: req.body.currency,
      profile_image: req.body.profile_image,
      two_factor_enabled: req.body.two_factor_enabled,
      auth_token: req.body.auth_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const jwtQuery = jwt.verify(value.auth_token);

    if (!jwtQuery) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const find = { id: jwtQuery.user_id };

    const update = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      country: value.country,
      language: value.language,
      currency: value.currency,
      profile_image: value.profile_image,
      two_factor_enabled: value.two_factor_enabled,
    };

    const userQuery = await query.table("users").findOrUpdate(find, update);

    return res.status(http.ACCOUNT_UPDATED.code).json({
      ...http.ACCOUNT_UPDATED,
      result: {
        user: userQuery.record,
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
