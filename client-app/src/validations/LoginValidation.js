import Joi from "joi";

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Disable TLD validation
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.email": "Please enter a valid email",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
    }),
});

export { loginValidation };
