const http = {
  // ERROR RESPONSE CODES
  BAD_REQUEST: {
    status: "ERROR",
    code: 400,
    message: "Bad request. Missing or invalid parameters.",
  },
  UNAUTHORIZED: {
    status: "ERROR",
    code: 401,
    message: "Unauthorized access. Please log in.",
  },
  FORBIDDEN: {
    status: "ERROR",
    code: 403,
    message: "Forbidden access. You do not have permission.",
  },
  NOT_FOUND: {
    status: "ERROR",
    code: 404,
    message: "Resource not found.",
  },
  METHOD_NOT_ALLOWED: {
    status: "ERROR",
    code: 405,
    message: "Method not allowed.",
  },
  INTERNAL_SERVER_ERROR: {
    status: "ERROR",
    code: 500,
    message: "Internal server error. Please try again later.",
  },
  SERVICE_UNAVAILABLE: {
    status: "ERROR",
    code: 503,
    message: "Service unavailable. Please try again later.",
  },
  TOO_MANY_REQUESTS: {
    status: "ERROR",
    code: 429,
    message: "Too many requests. Please try again later.",
  },
  NETWORK_ERROR: {
    status: "ERROR",
    code: 503,
    message: "Network error. Please try again later.",
  },
  // ACCOUNT RELATED RESPONSES
  ACCOUNT_CREATED: {
    status: "SUCCESS",
    code: 201,
    message: "Account created successfully.",
  },
  ACCOUNT_UPDATED: {
    status: "SUCCESS",
    code: 200,
    message: "Account updated successfully.",
  },
  ACCOUNT_DELETED: {
    status: "SUCCESS",
    code: 200,
    message: "Account deleted successfully.",
  },
  ACCOUNT_FOUND: {
    status: "SUCCESS",
    code: 200,
    message: "Recipient fetched successfully.",
  },
  ACCOUNT_NOT_FOUND: {
    status: "ERROR",
    code: 404,
    message: "Account not found.",
  },
  ACCOUNT_INACTIVE: {
    status: "ERROR",
    code: 423,
    message: "Account is inactive. Please verify your account.",
  },
  ACCOUNT_LOCKED: {
    status: "ERROR",
    code: 423,
    message: "Account locked. Contact support.",
  },
  // LOGIN/LOGOUT RESPONSE CODES
  LOGIN_SUCCESS: {
    status: "SUCCESS",
    code: 200,
    message: "Login successful.",
  },
  LOGOUT_SUCCESS: {
    status: "SUCCESS",
    code: 200,
    message: "Logged out successfully.",
  },
  // PASSWORD/VERIFICATION RESPONSE CODES
  PASSWORD_CHANGED: {
    status: "SUCCESS",
    code: 200,
    message: "Password changed successfully.",
  },
  VERIFICATION_SUCCESS: {
    status: "SUCCESS",
    code: 200,
    message: "Verification successful.",
  },
  INVALID_OTP: {
    status: "ERROR",
    code: 422,
    message: "Invalid OTP.",
  },
  // TRANSACTIONS RESPONSE CODES
  TRANSACTION_SUCCESS: {
    status: "SUCCESS",
    code: 200,
    message: "Transaction completed successfully.",
  },
  FUNDS_TRANSFERRED: {
    status: "SUCCESS",
    code: 200,
    message: "Funds transferred successfully.",
  },
  TRANSFER_FAILED: {
    status: "ERROR",
    code: 500,
    message: "Transfer failed. Please try again.",
  },
  INSUFFICIENT_FUNDS: {
    status: "ERROR",
    code: 422,
    message: "Insufficient funds.",
  },
  EXCEEDS_TRANSFER_LIMIT: {
    status: "ERROR",
    code: 422,
    message: "Transfer limit exceeded.",
  },
  // RECIPIENT RESPONSE CODES
  RECIPIENT_CREATED: {
    status: "SUCCESS",
    code: 201,
    message: "Recipient created successfully.",
  },
  RECIPIENT_UPDATED: {
    status: "SUCCESS",
    code: 200,
    message: "Recipient updated successfully.",
  },
  RECIPIENT_DELETED: {
    status: "SUCCESS",
    code: 200,
    message: "Recipient deleted successfully.",
  },
  RECIPIENT_FOUND: {
    status: "SUCCESS",
    code: 200,
    message: "Recipient fetched successfully.",
  },
  RECIPIENT_CONFLICT: {
    status: "ERROR",
    code: 409,
    message: "Recipient already exists.",
  },
  RECIPIENT_NOT_FOUND: {
    status: "ERROR",
    code: 404,
    message: "Recipient not found.",
  },
  // OTHER SPECIFIC RESPONSE CODES
  EXPIRED_SESSION: {
    status: "ERROR",
    code: 440,
    message: "Session expired. Please log in again.",
  },
  PAYMENT_SUCCESS: {
    status: "SUCCESS",
    code: 200,
    message: "Payment processed successfully.",
  },
  CURRENCY_EXCHANGE_SUCCESS: {
    status: "SUCCESS",
    code: 200,
    message: "Currency exchange completed successfully.",
  },
  PROFILE_UPDATED: {
    status: "SUCCESS",
    code: 200,
    message: "Profile updated successfully.",
  },
  INVALID_CURRENCY: {
    status: "ERROR",
    code: 422,
    message: "Invalid currency.",
  },
  INVALID_ACCOUNT_DETAILS: {
    status: "ERROR",
    code: 422,
    message: "Invalid account details.",
  },

  // PRECONDITION REQUIRED & OTHER ERRORS
  PRECONDITION_REQUIRED: {
    status: "ERROR",
    code: 428,
    message: "Precondition required. Please verify your identity.",
  },
  PAYMENT_GATEWAY_ERROR: {
    status: "ERROR",
    code: 502,
    message: "Payment gateway error. Please try again later.",
  },
  SERVICE_NOT_AVAILABLE_IN_REGION: {
    status: "ERROR",
    code: 503,
    message: "Service not available in your region.",
  },
};

export default http;
