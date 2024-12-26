import crypto from "crypto";

const hash = {
  sha512: (input) => {
    return crypto.createHash("sha512").update(input).digest("hex");
  },
  sha256: (input) => {
    return crypto.createHash("sha256").update(input).digest("hex");
  },
  md5: (input) => {
    return crypto.createHash("md5").update(input).digest("hex");
  },
  base64encode: (input) => {
    return Buffer.from(input).toString("base64");
  },
  base64decode: (input) => {
    return Buffer.from(input, "base64").toString("utf-8");
  },
};

export default hash;
