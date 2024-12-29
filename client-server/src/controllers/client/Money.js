import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import query from "../../utils/Query.js";
import validation from "../../utils/Validation.js";

const getWallet = async (req, res) => {
  try {
    const { value, error } = validation.getWallet.validate({
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
    const walletQuery = await query.table("wallets").findOne(find);

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

// Add Money to Wallet
const addMoney = async (req, res) => {
  try {
    const { value, error } = validation.addMoney.validate({
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
    const walletQuery = await query.table("wallets").findOne(find);

    if (!walletQuery) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { user_id: jwtQuery.user_id } },
      });
    }

    const update = {
      balance: walletQuery.balance + value.amount, // Adding the amount to the existing balance
    };

    await query.table("wallets").findOrUpdate(find, update);

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Money added successfully.",
      result: { wallet: { balance: update.balance } },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

// Withdraw Money from Wallet
const withdrawMoney = async (req, res) => {
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
    const walletQuery = await query.table("wallets").findOne(find);

    if (!walletQuery || walletQuery.balance < value.amount) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { insufficient_balance: walletQuery.balance },
      });
    }

    const update = {
      balance: walletQuery.balance - value.amount, // Deducting the amount from balance
    };

    await query.table("wallets").findOrUpdate(find, update);

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

// Transfer Money from one wallet to another
const transferMoney = async (req, res) => {
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

    const jwtQuery = jwt.verify(value.auth_token);

    if (!jwtQuery) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { auth_token: value.auth_token } },
      });
    }

    const senderFind = { user_id: jwtQuery.user_id };
    const senderWallet = await query.table("wallets").findOne(senderFind);

    if (!senderWallet || senderWallet.balance < value.amount) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { insufficient_balance: senderWallet.balance },
      });
    }

    const recipientFind = { user_id: value.recipient_user_id };
    const recipientWallet = await query.table("wallets").findOne(recipientFind);

    if (!recipientWallet) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { recipient_user_id: value.recipient_user_id } },
      });
    }

    // Deduct money from sender and add to recipient
    const senderUpdate = { balance: senderWallet.balance - value.amount };
    const recipientUpdate = { balance: recipientWallet.balance + value.amount };

    await query.table("wallets").findOrUpdate(senderFind, senderUpdate);
    await query.table("wallets").findOrUpdate(recipientFind, recipientUpdate);

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
export {
  getWallet,
  addMoney,
  withdrawMoney,
  transferMoney,
  getTransactionHistory,
};
