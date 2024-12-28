import Joi from "joi";

const validation = {
  signUp: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  logout: Joi.object({
    auth_token: Joi.string().required(),
  }),

  forgetPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  changePassword: Joi.object({
    newPassword: Joi.string().min(6).required(),
    auth_token: Joi.string().required(),
  }),

  recipient: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    bank_name: Joi.string().required(),
    account_number: Joi.string().required(),
    ifsc_code: Joi.string().required(),
    document_type: Joi.string().optional(),
    document_number: Joi.string().optional(),
    reason: Joi.string().required(),
    auth_token: Joi.string().required(),
  }),
};

export default validation;
