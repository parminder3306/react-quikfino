const http = {
  // ERROR RESPONSE CODES
  BAD_REQUEST: {
    code: 400,
    status: "ERROR",
    message: "Bad request. Missing or invalid parameters.",
  },
  UNAUTHORIZED: {
    code: 401,
    status: "ERROR",
    message: "Unauthorized access. Please log in.",
  },
  FORBIDDEN: {
    code: 403,
    status: "ERROR",
    message: "Forbidden access. You do not have permission.",
  },
  NOT_FOUND: {
    code: 404,
    status: "ERROR",
    message: "Resource not found.",
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    status: "ERROR",
    message: "Method not allowed.",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: "ERROR",
    message: "Internal server error. Please try again later.",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    status: "ERROR",
    message: "Service unavailable. Please try again later.",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    status: "ERROR",
    message: "Too many requests. Please try again later.",
  },
  NETWORK_ERROR: {
    code: 503,
    status: "ERROR",
    message: "Network error. Please try again later.",
  },
  // ACCOUNT RELATED RESPONSES
  ACCOUNT_CREATED: {
    code: 201,
    status: "SUCCESS",
    message: "Account created successfully.",
  },
  ACCOUNT_UPDATED: {
    code: 200,
    status: "SUCCESS",
    message: "Account updated successfully.",
  },
  ACCOUNT_DELETED: {
    code: 200,
    status: "SUCCESS",
    message: "Account deleted successfully.",
  },
  ACCOUNT_FOUND: {
    code: 200,
    status: "SUCCESS",
    message: "Account fetched successfully.",
  },
  ACCOUNT_NOT_FOUND: {
    code: 404,
    status: "ERROR",
    message: "Account not found.",
  },
  ACCOUNT_INACTIVE: {
    code: 423,
    status: "ERROR",
    message: "Account is inactive. Please verify your account.",
  },
  ACCOUNT_LOCKED: {
    code: 423,
    status: "ERROR",
    message: "Account locked. Contact support.",
  },
  WALLET_FOUND: {
    code: 200,
    status: "SUCCESS",
    message: "Wallet fetched successfully.",
  },
  // LOGIN/LOGOUT RESPONSE CODES
  LOGIN_SUCCESS: {
    code: 200,
    status: "SUCCESS",
    message: "Login successful.",
  },
  LOGOUT_SUCCESS: {
    code: 200,
    status: "SUCCESS",
    message: "Logged out successfully.",
  },
  // PASSWORD/VERIFICATION RESPONSE CODES
  PASSWORD_CHANGED: {
    code: 200,
    status: "SUCCESS",
    message: "Password changed successfully.",
  },
  VERIFICATION_SUCCESS: {
    code: 200,
    status: "SUCCESS",
    message: "Verification successful.",
  },
  INVALID_OTP: {
    code: 422,
    status: "ERROR",
    message: "Invalid OTP.",
  },
  // TRANSACTIONS RESPONSE CODES
  TRANSACTION_SUCCESS: {
    code: 200,
    status: "SUCCESS",
    message: "Transaction completed successfully.",
  },
  FUNDS_TRANSFERRED: {
    code: 200,
    status: "SUCCESS",
    message: "Funds transferred successfully.",
  },
  TRANSFER_FAILED: {
    code: 500,
    status: "ERROR",
    message: "Transfer failed. Please try again.",
  },
  INSUFFICIENT_FUNDS: {
    code: 422,
    status: "ERROR",
    message: "Insufficient funds.",
  },
  EXCEEDS_TRANSFER_LIMIT: {
    code: 422,
    status: "ERROR",
    message: "Transfer limit exceeded.",
  },
  // RECIPIENT RESPONSE CODES
  RECIPIENT_CREATED: {
    code: 201,
    status: "SUCCESS",
    message: "Recipient created successfully.",
  },
  RECIPIENT_UPDATED: {
    code: 200,
    status: "SUCCESS",
    message: "Recipient updated successfully.",
  },
  RECIPIENT_DELETED: {
    code: 200,
    status: "SUCCESS",
    message: "Recipient deleted successfully.",
  },
  RECIPIENT_FOUND: {
    code: 200,
    status: "SUCCESS",
    message: "Recipient fetched successfully.",
  },
  RECIPIENT_CONFLICT: {
    code: 409,
    status: "ERROR",
    message: "Recipient already exists.",
  },
  RECIPIENT_NOT_FOUND: {
    code: 404,
    status: "ERROR",
    message: "Recipient not found.",
  },
  // OTHER SPECIFIC RESPONSE CODES
  EXPIRED_SESSION: {
    code: 440,
    status: "ERROR",
    message: "Session expired. Please log in again.",
  },
  PAYMENT_SUCCESS: {
    code: 200,
    status: "SUCCESS",
    message: "Payment processed successfully.",
  },
  CURRENCY_EXCHANGE_SUCCESS: {
    code: 200,
    status: "SUCCESS",
    message: "Currency exchange completed successfully.",
  },
  PROFILE_UPDATED: {
    code: 200,
    status: "SUCCESS",
    message: "Profile updated successfully.",
  },
  INVALID_CURRENCY: {
    code: 422,
    status: "ERROR",
    message: "Invalid currency.",
  },
  INVALID_ACCOUNT_DETAILS: {
    code: 422,
    status: "ERROR",
    message: "Invalid account details.",
  },

  // PRECONDITION REQUIRED & OTHER ERRORS
  PRECONDITION_REQUIRED: {
    code: 428,
    status: "ERROR",
    message: "Precondition required. Please verify your identity.",
  },
  PAYMENT_GATEWAY_ERROR: {
    code: 502,
    status: "ERROR",
    message: "Payment gateway error. Please try again later.",
  },
  SERVICE_NOT_AVAILABLE_IN_REGION: {
    code: 503,
    status: "ERROR",
    message: "Service not available in your region.",
  },
};

export default http;
