import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

import { addTransaction } from "../client/Transaction.js";

const transferToBank = async (req, res) => {
  try {
    const { value, error } = validation.transferMoney.validate({
      user_token: req.body.user_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: userToken.user_id };
    const senderWallet = await db.table("wallets").findOne(senderFind);

    if (!senderWallet || senderWallet.balance < value.amount) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { insufficient_balance: senderWallet.balance },
      });
    }

    const recipientFind = { user_id: value.recipient_user_id };
    const recipientWallet = await db.table("wallets").findOne(recipientFind);

    if (!recipientWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { recipient_user_id: value.recipient_user_id } },
      });
    }

    // Deduct money from sender and add to recipient
    const senderUpdate = { balance: senderWallet.balance - value.amount };
    const recipientUpdate = { balance: recipientWallet.balance + value.amount };

    await db.table("wallets").findOrUpdate(senderFind, senderUpdate);
    await db.table("wallets").findOrUpdate(recipientFind, recipientUpdate);

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Money transferred successfully.",
      result: {
        sender_wallet: { balance: senderUpdate.balance },
        recipient_wallet: { balance: recipientUpdate.balance },
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const transferToGlobal = async (req, res) => {
  try {
    const { value, error } = validation.transferMoney.validate({
      user_token: req.body.user_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: userToken.user_id };
    const senderWallet = await db.table("wallets").findOne(senderFind);

    if (!senderWallet || senderWallet.balance < value.amount) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { insufficient_balance: senderWallet.balance },
      });
    }

    const recipientFind = { user_id: value.recipient_user_id };
    const recipientWallet = await db.table("wallets").findOne(recipientFind);

    if (!recipientWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { recipient_user_id: value.recipient_user_id } },
      });
    }

    // Deduct money from sender and add to recipient
    const senderUpdate = { balance: senderWallet.balance - value.amount };
    const recipientUpdate = { balance: recipientWallet.balance + value.amount };

    await db.table("wallets").findOrUpdate(senderFind, senderUpdate);
    await db.table("wallets").findOrUpdate(recipientFind, recipientUpdate);

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Money transferred successfully.",
      result: {
        sender_wallet: { balance: senderUpdate.balance },
        recipient_wallet: { balance: recipientUpdate.balance },
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const transferToFriend = async (req, res) => {
  try {
    const { value, error } = validation.transferToFriend.validate({
      amount: req.body.amount,
      recipient_token: req.body.recipient_token,
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

    const recipientToken = jwt.verify(value.recipient_token);

    if (!recipientToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { recipient_token: value.recipient_token } },
      });
    }

    const userFind = { user_id: userToken.user_id };
    const userWallet = await db.table("wallets").findOne(userFind);

    if (userWallet.balance < value.amount) {
      return res.status(http.INSUFFICIENT_FUNDS.code).json({
        ...http.INSUFFICIENT_FUNDS,
        details: { insufficient_balance: userWallet.balance },
      });
    }

    const recipientFind = { user_id: recipientToken.user_id };
    const recipientWallet = await db.table("wallets").findOne(recipientFind);

    if (!recipientWallet) {
      return res.status(http.RECIPIENT_NOT_FOUND.code).json({
        ...http.RECIPIENT_NOT_FOUND,
        details: { no_match: { user_id: recipient_token.user_id } },
      });
    }

    const userWalletUpdate = {
      balance: Number(userWallet.balance - value.amount),
    };

    const recipientWalletUpdate = {
      balance: Number(recipientWallet.balance + value.amount),
    };

    const userWalletRecord = await db
      .table("wallets")
      .findOrUpdate(userWalletUpdate, userFind);

    const recipientWalletRecord = await db
      .table("wallets")
      .findOrUpdate(recipientWalletUpdate, recipientFind);

    await addTransaction({
      user_id: userToken.user_id,
      recipient_id: recipientToken.user_id,
      amount: value.amount,
      currency: "GBP",
      transaction_type: "transfer",
      status: "completed",
      user_token: value.user_token,
    });

    await addTransaction({
      user_id: recipientToken.user_id,
      recipient_id: userToken.user_id,
      amount: value.amount,
      currency: "GBP",
      transaction_type: "deposit",
      status: "completed",
      user_token: value.recipient_token,
    });

    return res.status(http.FUNDS_TRANSFERRED.code).json({
      ...http.FUNDS_TRANSFERRED,
      result: {
        sender_wallet: userWalletRecord.record,
        recipient_wallet: recipientWalletRecord.record,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const cancelTransfer = async (req, res) => {
  try {
    const { value, error } = validation.transferMoney.validate({
      user_token: req.body.user_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: userToken.user_id };
    const senderWallet = await db.table("wallets").findOne(senderFind);

    if (!senderWallet || senderWallet.balance < value.amount) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { insufficient_balance: senderWallet.balance },
      });
    }

    const recipientFind = { user_id: value.recipient_user_id };
    const recipientWallet = await db.table("wallets").findOne(recipientFind);

    if (!recipientWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { recipient_user_id: value.recipient_user_id } },
      });
    }

    // Deduct money from sender and add to recipient
    const senderUpdate = { balance: senderWallet.balance - value.amount };
    const recipientUpdate = { balance: recipientWallet.balance + value.amount };

    await db.table("wallets").findOrUpdate(senderFind, senderUpdate);
    await db.table("wallets").findOrUpdate(recipientFind, recipientUpdate);

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Money transferred successfully.",
      result: {
        sender_wallet: { balance: senderUpdate.balance },
        recipient_wallet: { balance: recipientUpdate.balance },
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export { transferToBank, transferToGlobal, transferToFriend, cancelTransfer };
