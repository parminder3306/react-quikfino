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
    user_token: Joi.string().required(),
  }),

  forgetPassword: Joi.object({
    email: Joi.string().email().required(),
  }),

  changePassword: Joi.object({
    newPassword: Joi.string().min(6).required(),
    user_token: Joi.string().required(),
  }),

  profile: Joi.object({
    user_token: Joi.string().required(),
  }),

  editProfile: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    country: Joi.string().required(),
    language: Joi.string().required(),
    profile_image: Joi.string().required(),
    two_factor_enabled: Joi.number().required(),
    user_token: Joi.string().required(),
  }),

  wallet: Joi.object({
    user_token: Joi.string().required(),
  }),

  addWallet: Joi.object({
    amount: Joi.number().required(),
    user_token: Joi.string().required(),
  }),

  payWallet: Joi.object({
    amount: Joi.number().required(),
    user_token: Joi.string().required(),
  }),

  recipient: Joi.object({
    user_token: Joi.string().required(),
  }),

  recipientFind: Joi.object({
    email: Joi.string().email().required(),
    user_token: Joi.string().required(),
  }),

  addRecipient: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    bank_name: Joi.string().required(),
    account_number: Joi.number().required(),
    ifsc_code: Joi.string().required(),
    document_type: Joi.string().optional(),
    document_number: Joi.string().optional(),
    reason: Joi.string().required(),
    user_token: Joi.string().required(),
  }),

  editRecipient: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    bank_name: Joi.string().required(),
    account_number: Joi.number().required(),
    ifsc_code: Joi.string().required(),
    document_type: Joi.string().optional(),
    document_number: Joi.string().optional(),
    reason: Joi.string().required(),
    user_token: Joi.string().required(),
  }),

  deleteRecipient: Joi.object({
    id: Joi.number().required(),
    user_token: Joi.string().required(),
  }),

  transaction: Joi.object({
    user_token: Joi.string().required(),
  }),

  addTransaction: Joi.object({
    user_id: Joi.number().required(),
    recipient_id: Joi.number().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    exchange_rate: Joi.number().optional(),
    converted_amount: Joi.number().optional(),
    transaction_type: Joi.string().required(),
    status: Joi.string().required(),
    user_token: Joi.string().required(),
  }),

  transferToFriend: Joi.object({
    amount: Joi.number().required(),
    recipient_token: Joi.string().required(),
    user_token: Joi.string().required(),
  }),
};

export default validation;
