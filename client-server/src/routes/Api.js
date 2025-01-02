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
  recipients,
  addRecipient,
  deleteRecipient,
  editRecipient,
} from "../controllers/client/Recipient.js";
import { profile, editProfile } from "../controllers/client/Profile.js";
import { wallet, addWallet, payWallet } from "../controllers/client/Wallet.js";
import {
  transactions,
  addTransaction,
} from "../controllers/client/Transaction.js";

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
api.post("/profile", profile);
api.post("/profile/edit", editProfile);

// // -----------------------------------------------
// // Wallet
// // -----------------------------------------------
api.post("/wallet", wallet);
api.post("/wallet/add", addWallet);
api.post("/wallet/pay", payWallet);

// // -----------------------------------------------
// // Recipient
// // -----------------------------------------------
api.post("/recipients", recipients);
api.post("/recipient/add", addRecipient);
api.post("/recipient/edit", editRecipient);
api.post("/recipient/delete", deleteRecipient);

// -----------------------------------------------
// Transaction
// -----------------------------------------------
api.post("/transactions", transactions);
api.post("/transaction/add", addTransaction);
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
