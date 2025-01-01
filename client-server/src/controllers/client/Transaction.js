import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import query from "../../utils/Query.js";
import validation from "../../utils/Validation.js";

// Get Transaction History (Example function)
const getTransactionHistory = async (req, res) => {
  try {
    const { value, error } = validation.getTransactionHistory.validate({
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

    const find = { user_id: jwtQuery.user_id };
    const transactionHistory = await query.table("transactions").find(find);

    if (!transactionHistory) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_transactions: "No transaction history found" },
      });
    }

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Transaction history retrieved successfully.",
      result: {
        transactions: transactionHistory,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

// Exporting all functions
export { getTransactionHistory };
