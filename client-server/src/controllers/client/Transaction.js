import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const transactions = async (req, res) => {
  try {
    const { value, error } = validation.transaction.validate({
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

    const condition = { user_id: userToken.user_id };

    const userTransaction = await db.table("transactions").findOne(condition);

    if (!userTransaction) {
      return res.status(http.TRANSACTION_NOT_FOUND.code).json({
        ...http.TRANSACTION_NOT_FOUND,
        details: { no_match: { user_id: userToken.user_id } },
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
      user_id: req.user_id,
      recipient_id: req.recipient_id,
      amount: req.amount,
      currency: req.currency,
      exchange_rate: req.exchange_rate,
      converted_amount: req.converted_amount,
      transaction_type: req.transaction_type,
      status: req.status,
      user_token: req.user_token,
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

    const createTransaction = {
      user_id: value.user_id,
      recipient_id: value.recipient_id,
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
