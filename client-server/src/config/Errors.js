const Errors = {
  SERVICE_UNAVAILABLE: {
    status: "ERROR",
    code: 503,
    message: "Service Unavailable. We are currently in maintenance.",
  },
  BAD_REQUEST: {
    status: "ERROR",
    code: 400,
    message:
      "Bad Request. The request could not be understood or was missing required parameters.",
  },
  UNAUTHORIZED: {
    status: "ERROR",
    code: 401,
    message: "Unauthorized. Authentication is required.",
  },
  FORBIDDEN: {
    status: "ERROR",
    code: 403,
    message: "Forbidden. You do not have permission to access this resource.",
  },
  NOT_FOUND: {
    status: "ERROR",
    code: 404,
    message: "Not Found. The resource could not be found.",
  },
  INTERNAL_SERVER_ERROR: {
    status: "ERROR",
    code: 500,
    message: "Internal Server Error. Something went wrong on the server.",
  },
};

export default Errors;
