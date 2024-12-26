import { createTransport } from "nodemailer";
import env from "./Env.js";

const config = {
  default: env.MAIL_MAILER || "log",

  mailers: {
    smtp: {
      transport: "smtp",
      options: {
        host: env.MAIL_HOST || "127.0.0.1",
        port: env.MAIL_PORT || 2525,
        secure: env.MAIL_ENCRYPTION === "ssl",
        auth: {
          user: env.MAIL_USERNAME,
          pass: env.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
    log: {
      transport: "log",
    },
    array: {
      transport: "array",
    },
    failover: {
      transport: "failover",
      options: [
        {
          transport: "smtp",
          options: {
            host: env.MAIL_HOST || "127.0.0.1",
            port: env.MAIL_PORT || 2525,
            secure: env.MAIL_ENCRYPTION === "ssl",
            auth: {
              user: env.MAIL_USERNAME,
              pass: env.MAIL_PASSWORD,
            },
          },
        },
        {
          transport: "log",
        },
      ],
    },
  },

  from: {
    address: env.MAIL_FROM_ADDRESS || "hello@example.com",
    name: env.MAIL_FROM_NAME || "Example",
  },
};

const createTransporter = () => {
  const mailer = mailConfig.default;
  const transportConfig = mailConfig.mailers[mailer];

  if (!transportConfig) {
    throw new Error(`Mailer "${mailer}" is not configured.`);
  }

  return createTransport(transportConfig.options || {});
};

export default {
  createTransporter,
  config,
};
