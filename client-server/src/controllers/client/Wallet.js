import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
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

    const jwtToken = jwt.verify(value.auth_token);

    if (!jwtToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const condition = { user_id: jwtToken.user_id };

    const userWallet = await db.table("wallets").findOne(condition);

    if (!userWallet) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_id: jwtToken.user_id } },
      });
    }

    return res.status(http.WALLET_FOUND.code).json({
      ...http.WALLET_FOUND,
      result: {
        wallet: userWallet,
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

    const jwtToken = jwt.verify(value.auth_token);

    if (!jwtToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const condition = { user_id: jwtToken.user_id };

    const userWallet = await db.table("wallets").findOne(condition);

    if (!userWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { user_id: jwtToken.user_id } },
      });
    }

    const walletUpdate = {
      balance: Number(userWallet.balance + value.amount),
    };

    const { record } = await db
      .table("wallets")
      .findOrUpdate(walletUpdate, condition);

    return res.status(http.WALLET_MONEY_ADDED.code).json({
      ...http.WALLET_MONEY_ADDED,
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
    const { value, error } = validation.addWallet.validate({
      amount: req.body.amount,
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

    const userWallet = await db.table("wallets").findOne(condition);

    if (!userWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { user_id: jwtToken.user_id } },
      });
    }

    if (userWallet.balance < value.amount) {
      return res.status(http.INSUFFICIENT_FUNDS.code).json({
        ...http.INSUFFICIENT_FUNDS,
        result: { wallet: { balance: userWallet.balance } },
      });
    }

    const walletUpdate = {
      balance: Number(userWallet.balance - value.amount),
    };

    const { record } = await db
      .table("wallets")
      .findOrUpdate(walletUpdate, condition);

    return res.status(http.WALLET_MONEY_DEBIT.code).json({
      ...http.WALLET_MONEY_DEBIT,
      result: { wallet: record },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export { wallet, addWallet, payWallet };
