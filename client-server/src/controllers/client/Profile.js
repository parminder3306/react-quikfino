const getProfile = async (req, res) => {
  try {
    const { value, error } = validation.logout.validate({
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
        user_id: jwtQuery.user_id,
    };

    const userQuery = await query.table("users").findOne(find);

    if (!userQuery) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { email: value.email } },
      });
    }

    return res.status(http.LOGIN_SUCCESS.code).json({
      ...http.LOGIN_SUCCESS,
      result: {
        user: userQuery,
        auth_token: jwt.create(userQuery.id),
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const updateProfile = () => {};

export { getProfile, updateProfile };
