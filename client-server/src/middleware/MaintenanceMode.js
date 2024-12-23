import env from "../config/Env.js";

const exceptUris = ["/health", "/status"];

const preventRequestsDuringMaintenance = (req, res, next) => {
  if (env.MAINTENANCE_MODE && !exceptUris.includes(req.originalUrl)) {
    return res.status(503).json({
      message: "Service Unavailable. We are currently in maintenance.",
    });
  }
  next();
};

export default preventRequestsDuringMaintenance;
