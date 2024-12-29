import { Router } from "express";
import {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/client/Authentication.js";
import {
  getRecipients,
  addRecipient,
  deleteRecipient,
  updateRecipient,
} from "../controllers/client/Recipient.js";
import { getProfile, updateProfile } from "../controllers/client/Profile.js";
import { getWallet, updateWallet } from "../controllers/client/Money.js";

const api = Router();

// -----------------------------------------------
// Authentication
// -----------------------------------------------
api.post("/auth/signup", signUp);
api.post("/auth/login", login);
api.post("/auth/logout", logout);
api.post("/auth/forgot-password", forgotPassword);
api.post("/auth/reset-password", resetPassword);
api.post("/auth/change-password", changePassword);

// // -----------------------------------------------
// // Profile
// // -----------------------------------------------
api.post("/profile", getProfile);
api.post("/profile/update", updateProfile);

// // -----------------------------------------------
// // Wallet
// // -----------------------------------------------
api.post("/wallet", getWallet);
api.post("/wallet/update", updateWallet);

// // -----------------------------------------------
// // Recipient
// // -----------------------------------------------
api.post("/recipients", getRecipients);
api.post("/recipients/add", addRecipient);
api.post("/recipients/update", updateRecipient);
api.post("/recipients/delete", deleteRecipient);

// // -----------------------------------------------
// // Money Transfer
// // -----------------------------------------------
// api.post("/money/transactions", getTransactionHistory);
// api.post("/money/transfer/add", transferMoney);
// api.post("/money/transfer/cancel", getTransactionHistory);
// // -----------------------------------------------
// // Subscription
// // -----------------------------------------------
// api.get("/subscription", getSubscription);
// api.put("/subscription/update", updateSubscription);
// // -----------------------------------------------
// // Help
// // -----------------------------------------------
// api.get("/help", getHelp);

// // -----------------------------------------------
// // Settings
// // -----------------------------------------------
// api.get("/settings/countries", getCountryList);
// api.get("/settings/currencies", getCurrencyList);

// // -----------------------------------------------
// // Payment Section
// // -----------------------------------------------
// api.post("/payment/redeem-voucher", redeemVoucher);

export default api;
