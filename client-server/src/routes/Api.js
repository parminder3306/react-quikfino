import { Router } from "express";
import {
  signUp,
  login,
  logout,
  forgotPassword,
  changePassword,
} from "../controllers/client/Authentication.js";

const api = Router();

// -----------------------------------------------
// Authentication
// -----------------------------------------------
api.post("/auth/signup", signUp);
api.post("/auth/login", login);
api.post("/auth/logout", logout);
api.post("/auth/forgot-password", forgotPassword);
api.post("/auth/change-password", changePassword);
// // -----------------------------------------------
// // Recipient
// // -----------------------------------------------
// api.post("/recipients", getRecipients);
// api.post("/recipients/add", addRecipient);
// api.post("/recipients/delete", removeRecipient);

// // -----------------------------------------------
// // Money Transfer
// // -----------------------------------------------
// api.post("/money/transactions", getTransactionHistory);
// api.post("/money/transfer/add", transferMoney);
// api.post("/money/transfer/cancel", getTransactionHistory);

// // -----------------------------------------------
// // Profile
// // -----------------------------------------------
// api.get("/profile", getProfile);
// api.put("/profile/update", verifyToken, updateProfile);

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
