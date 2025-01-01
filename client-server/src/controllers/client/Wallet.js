import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import query from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const wallet = async (req, res) => {
  try {
    const { value, error } = validation.wallet.validate({
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
    const walletQuery = await db.table("wallets").findOne(find);

    if (!walletQuery) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_id: jwtQuery.user_id } },
      });
    }

    return res.status(http.WALLET_FOUND.code).json({
      ...http.WALLET_FOUND,
      result: {
        wallet: walletQuery,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const addWallet = async (req, res) => {
  try {
    const { value, error } = validation.addWallet.validate({
      amount: req.body.amount,
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

    const walletQuery = await db.table("wallets").findOne(find);

    if (!walletQuery) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { user_id: jwtQuery.user_id } },
      });
    }

    const walletBalance = walletQuery.balance;
    const addAmount = value.amount;

    const update = {
      balance: Number(walletBalance + addAmount),
    };

    const { record } = await db.table("wallets").findOrUpdate(find, update);

    return res.status(http.WALLET_UPDATED.code).json({
      ...http.WALLET_UPDATED,
      result: { wallet: record },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const payWallet = async (req, res) => {
  try {
    const { value, error } = validation.withdrawMoney.validate({
      auth_token: req.body.auth_token,
      amount: req.body.amount,
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
    const walletQuery = await db.table("wallets").findOne(find);

    if (!walletQuery || walletQuery.balance < value.amount) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { insufficient_balance: walletQuery.balance },
      });
    }

    const update = {
      balance: walletQuery.balance - value.amount, // Deducting the amount from balance
    };

    await db.table("wallets").findOrUpdate(find, update);

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Money withdrawn successfully.",
      result: { wallet: { balance: update.balance } },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export { wallet, addWallet, payWallet };
