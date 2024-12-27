import Joi from "joi";

const validation = {
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

  logout: Joi.object({
    authToken: Joi.string().required().messages({
      "string.base": "Token must be a valid string.",
      "any.required": "Token is required.",
      "string.empty": "Token cannot be empty.",
    }),
  }),

  forgetPassword: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be a valid string.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
    }),
  }),

  changePassword: Joi.object({
    newPassword: Joi.string().min(6).required().messages({
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
    }),

    authToken: Joi.string().required().messages({
      "string.base": "Token must be a valid string.",
      "any.required": "Token is required.",
      "string.empty": "Token cannot be empty.",
    }),
  }),
};

export default validation;
