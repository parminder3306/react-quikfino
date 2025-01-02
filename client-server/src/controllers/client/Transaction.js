import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const transactions = async (req, res) => {
  try {
    const { value, error } = validation.transaction.validate({
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

    const condition = { user_id: jwtToken.user_id };

    const userTransaction = await db.table("transactions").findOne(condition);

    if (!userTransaction) {
      return res.status(http.TRANSACTION_NOT_FOUND.code).json({
        ...http.TRANSACTION_NOT_FOUND,
        details: { no_match: { user_id: jwtToken.user_id } },
      });
    }

    return res.status(http.TRANSACTION_FOUND.code).json({
      ...http.TRANSACTION_FOUND,
      result: {
        transaction: userTransaction,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { value, error } = validation.addTransaction.validate({
      user_id: req.body.user_id,
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      amount: req.body.amount,
      currency: req.body.currency,
      exchange_rate: req.body.exchange_rate,
      converted_amount: req.body.converted_amount,
      transaction_type: req.body.transaction_type,
      status: req.body.status,
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

    const createTransaction = {
      user_id: value.user_id,
      sender_id: value.sender_id,
      receiver_id: value.receiver_id,
      amount: value.amount,
      currency: value.currency,
      exchange_rate: value.exchange_rate,
      converted_amount: value.converted_amount,
      transaction_type: value.transaction_type,
      status: value.status,
    };

    const userTransaction = await db
      .table("transactions")
      .createOrRecord(createTransaction);

    return res.status(http.TRANSACTION_CREATED.code).json({
      ...http.TRANSACTION_CREATED,
      result: {
        transaction: userTransaction,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export { transactions, addTransaction };
