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
// api.post("/recipients", verifyToken, addRecipient); // Add Recipient
// api.get("/recipients", verifyToken, getRecipients); // Get All Recipients
// api.delete("/recipients/:recipientId", verifyToken, removeRecipient); // Remove Recipient

// // -----------------------------------------------
// // Money Transfer
// // -----------------------------------------------
// api.post("/transfer", verifyToken, transferMoney); // Transfer Money
// api.get("/transactions", verifyToken, getTransactionHistory); // Get Transaction History

// // -----------------------------------------------
// // Profile
// // -----------------------------------------------
// api.get("/profile", verifyToken, getProfile); // Get Profile
// api.put("/profile", verifyToken, updateProfile); // Update Profile

// // -----------------------------------------------
// // Subscription
// // -----------------------------------------------
// api.get("/subscription", verifyToken, getSubscription); // Get Subscription Plan
// api.put("/subscription", verifyToken, updateSubscription); // Update Subscription Plan

// // -----------------------------------------------
// // Help
// // -----------------------------------------------
// api.get("/help", getHelp); // Get Help/FAQs
// api.put("/help", verifyToken, updateHelp); // Update Help Information

// // -----------------------------------------------
// // Settings
// // -----------------------------------------------
// api.get("/settings/countries", getCountryList); // Get Country List
// api.get("/settings/currencies", getCurrencyList); // Get Currency List

// // -----------------------------------------------
// // Payment Section
// // -----------------------------------------------
// api.post("/payment/redeem-voucher", verifyToken, redeemVoucher); // Redeem Voucher

export default api;
