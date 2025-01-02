import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const transferToBank = async (req, res) => {
  try {
    const { value, error } = validation.transferMoney.validate({
      auth_token: req.body.auth_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: jwtToken.user_id };
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
      auth_token: req.body.auth_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: jwtToken.user_id };
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
    const { value, error } = validation.transferMoney.validate({
      auth_token: req.body.auth_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: jwtToken.user_id };
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

const cancelTransfer = async (req, res) => {
  try {
    const { value, error } = validation.transferMoney.validate({
      auth_token: req.body.auth_token,
      amount: req.body.amount,
      recipient_user_id: req.body.recipient_user_id,
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

    const senderFind = { user_id: jwtToken.user_id };
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
