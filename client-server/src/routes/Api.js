import { Router } from "express";
import { login, signUp, logout, forgotPassword, changePassword } from "../controllers/Authentication.js";
import { addRecipient, getRecipients, removeRecipient } from "../controllers/Recipient.js";
import { transferMoney, getTransactionHistory } from "../controllers/MoneyTransfer.js";
import { getProfile, updateProfile } from "../controllers/Profile.js";
import { getSubscription, updateSubscription } from "../controllers/Subscription.js";
import { getHelp, updateHelp } from "../controllers/Help.js";
import { getCountryList, getCurrencyList } from "../controllers/Settings.js";
import { redeemVoucher } from "../controllers/Payment.js";
import verifyToken from "../middleware/VerifyToken.js";

const api = Router();

// -----------------------------------------------
// Authentication Section
// -----------------------------------------------
api.post("/auth/signup", signUp);  // Sign Up
api.post("/auth/login", login);    // Login
api.post("/auth/logout", verifyToken, logout); // Logout (Protected)
api.post("/auth/forgot-password", forgotPassword); // Forgot Password
api.post("/auth/change-password", verifyToken, changePassword); // Change Password

// -----------------------------------------------
// Recipient Section
// -----------------------------------------------
api.post("/recipients", verifyToken, addRecipient);  // Add Recipient
api.get("/recipients", verifyToken, getRecipients);   // Get All Recipients
api.delete("/recipients/:recipientId", verifyToken, removeRecipient);  // Remove Recipient

// -----------------------------------------------
// Money Transfer Section
// -----------------------------------------------
api.post("/transfer", verifyToken, transferMoney);  // Transfer Money
api.get("/transactions", verifyToken, getTransactionHistory);  // Get Transaction History

// -----------------------------------------------
// Profile Section
// -----------------------------------------------
api.get("/profile", verifyToken, getProfile); // Get Profile
api.put("/profile", verifyToken, updateProfile); // Update Profile

// -----------------------------------------------
// Subscription Section
// -----------------------------------------------
api.get("/subscription", verifyToken, getSubscription);  // Get Subscription Plan
api.put("/subscription", verifyToken, updateSubscription);  // Update Subscription Plan

// -----------------------------------------------
// Help Section
// -----------------------------------------------
api.get("/help", getHelp);  // Get Help/FAQs
api.put("/help", verifyToken, updateHelp);  // Update Help Information

// -----------------------------------------------
// Settings Section
// -----------------------------------------------
api.get("/settings/countries", getCountryList);  // Get Country List
api.get("/settings/currencies", getCurrencyList); // Get Currency List

// -----------------------------------------------
// Payment Section
// -----------------------------------------------
api.post("/payment/redeem-voucher", verifyToken, redeemVoucher);  // Redeem Voucher

export default api;
