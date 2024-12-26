import Joi from "joi";

const validation = {
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a valid string.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
    }),

    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
    }),
  }),

  signUp: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a valid string.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
    }),

    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
    }),
  }),
};

export default validation;
