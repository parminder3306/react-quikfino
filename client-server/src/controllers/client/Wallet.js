import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const wallet = async (req, res) => {
  try {
    const { value, error } = validation.wallet.validate({
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

    const userWalletFind = { user_id: userToken.user_id };

    const userWallet = await db.table("wallets").findOne(userWalletFind);

    if (!userWallet) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_id: userToken.user_id } },
      });
    }

    return res.status(http.WALLET_FOUND.code).json({
      ...http.WALLET_FOUND,
      result: {
        wallet: { ...userWallet },
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

    const userWalletFind = { user_id: userToken.user_id };

    const userWallet = await db.table("wallets").findOne(userWalletFind);

    if (!userWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { user_id: userToken.user_id } },
      });
    }

    const walletUpdate = {
      balance: Number(userWallet.balance + value.amount),
    };

    const { record } = await db
      .table("wallets")
      .findOrUpdate(userWalletFind, walletUpdate);

    return res.status(http.WALLET_MONEY_ADDED.code).json({
      ...http.WALLET_MONEY_ADDED,
      result: { wallet: { ...record } },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export { wallet, addWallet };
