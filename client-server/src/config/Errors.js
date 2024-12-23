const Errors = {
  SERVICE_UNAVAILABLE: {
    status: "ERROR",
    code: 503,
    message: "Service Unavailable. Please try again later.",
  },
  BAD_REQUEST: {
    status: "ERROR",
    code: 400,
    message: "Bad Request. Missing or invalid parameters.",
  },
  UNAUTHORIZED: {
    status: "ERROR",
    code: 401,
    message: "Unauthorized. Please log in.",
  },
  FORBIDDEN: {
    status: "ERROR",
    code: 403,
    message: "Forbidden. You don't have permission.",
  },
  NOT_FOUND: {
    status: "ERROR",
    code: 404,
    message: "Not Found. Resource not found.",
  },
  INTERNAL_SERVER_ERROR: {
    status: "ERROR",
    code: 500,
    message: "Internal Server Error. Please try again later.",
  },
  CONFLICT: {
    status: "ERROR",
    code: 409,
    message: "User already exists. Try logging in.",
  },
  METHOD_NOT_ALLOWED: {
    status: "ERROR",
    code: 405,
    message: "Method Not Allowed.",
  },
  REQUEST_TIMEOUT: {
    status: "ERROR",
    code: 408,
    message: "Request Timeout. Please try again.",
  },
  TOO_MANY_REQUESTS: {
    status: "ERROR",
    code: 429,
    message: "Too Many Requests. Try again later.",
  },
  INVALID_AMOUNT: {
    status: "ERROR",
    code: 422,
    message: "Invalid Amount.",
  },
  INSUFFICIENT_BALANCE: {
    status: "ERROR",
    code: 422,
    message: "Insufficient Balance.",
  },
  EXCEEDS_TRANSFER_LIMIT: {
    status: "ERROR",
    code: 422,
    message: "Transfer Limit Exceeded.",
  },
  INVALID_CURRENCY: {
    status: "ERROR",
    code: 422,
    message: "Invalid Currency.",
  },
  INVALID_ACCOUNT_DETAILS: {
    status: "ERROR",
    code: 422,
    message: "Invalid Account Details.",
  },
  TRANSFER_FAILED: {
    status: "ERROR",
    code: 500,
    message: "Transfer Failed. Try again.",
  },
  ACCOUNT_LOCKED: {
    status: "ERROR",
    code: 423,
    message: "Account Locked. Contact support.",
  },
  PRECONDITION_REQUIRED: {
    status: "ERROR",
    code: 428,
    message: "Precondition Required. Verify identity.",
  },
  PAYMENT_GATEWAY_ERROR: {
    status: "ERROR",
    code: 502,
    message: "Payment Gateway Error. Try again later.",
  },
  SERVICE_NOT_AVAILABLE_IN_REGION: {
    status: "ERROR",
    code: 503,
    message: "Service Not Available in Your Region.",
  },
  TRANSACTION_LIMIT_REACHED: {
    status: "ERROR",
    code: 429,
    message: "Transaction Limit Reached.",
  },
  EXPIRED_SESSION: {
    status: "ERROR",
    code: 440,
    message: "Session Expired. Log in again.",
  },
  VERIFICATION_REQUIRED: {
    status: "ERROR",
    code: 401,
    message: "Verification Required.",
  },
  INVALID_OTP: {
    status: "ERROR",
    code: 422,
    message: "Invalid OTP.",
  },
  UNAVAILABLE_CURRENCY_PAIR: {
    status: "ERROR",
    code: 404,
    message: "Currency Pair Unavailable.",
  },
  ACCOUNT_NOT_FOUND: {
    status: "ERROR",
    code: 404,
    message: "Account Not Found.",
  },
  EXPIRED_TRANSFER: {
    status: "ERROR",
    code: 410,
    message: "Transfer Expired.",
  },
  INSUFFICIENT_FUNDS_IN_DESTINATION_ACCOUNT: {
    status: "ERROR",
    code: 422,
    message: "Insufficient Funds in Destination Account.",
  },
  NETWORK_ERROR: {
    status: "ERROR",
    code: 503,
    message: "Network Error. Try again later.",
  },
  DUPLICATE_TRANSACTION: {
    status: "ERROR",
    code: 409,
    message: "Duplicate Transaction.",
  },
  CURRENCY_MISMATCH: {
    status: "ERROR",
    code: 422,
    message: "Currency Mismatch.",
  },
};

export default Errors;
