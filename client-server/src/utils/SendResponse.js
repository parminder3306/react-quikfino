const sendResponse = {
  error: (res, http, details = {}) => {
    return res.status(http.code).json({ ...http, details: details });
  },
  success: (res, http, result = {}) => {
    return res.status(http.code).json({ ...http, result: result });
  },
};

export default sendResponse;
