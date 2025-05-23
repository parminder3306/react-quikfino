import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

const recipients = async (req, res) => {
  try {
    const { value, error } = validation.recipient.validate({
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_token: value.user_token } },
      });
    }

    const find = {
      user_id: userToken.user_id,
    };

    const recipientQuery = await db.table("recipients").findBy(find);

    if (!recipientQuery) {
      return res.status(http.RECIPIENT_NOT_FOUND.code).json({
        ...http.RECIPIENT_NOT_FOUND,
        details: { no_match: { user_id: userToken.user_id } },
      });
    }

    return res.status(http.RECIPIENT_FOUND.code).json({
      ...http.RECIPIENT_FOUND,
      result: {
        recipient: recipientQuery,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const recipientFind = async (req, res) => {
  try {
    const { value, error } = validation.recipientFind.validate({
      email: req.body.email,
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const recipientFind = { email: value.email };

    const recipient = await db.table("users").findOne(recipientFind);

    if (!recipient || jwt.verify(value.user_token).user_id === recipient.id) {
      return res.status(http.RECIPIENT_NOT_FOUND.code).json({
        ...http.RECIPIENT_NOT_FOUND,
        details: { no_match: { email: value.email } },
      });
    }

    return res.status(http.RECIPIENT_FOUND.code).json({
      ...http.RECIPIENT_FOUND,
      result: {
        recipient: recipient,
        recipient_token: jwt.create(recipient.id),
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const addRecipient = async (req, res) => {
  try {
    const { value, error } = validation.addRecipient.validate({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      bank_name: req.body.bank_name,
      account_number: req.body.account_number,
      ifsc_code: req.body.ifsc_code,
      document_type: req.body.document_type,
      document_number: req.body.document_number,
      reason: req.body.reason,
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_token: value.user_token } },
      });
    }

    const find = {
      user_id: userToken.user_id,
      account_number: value.account_number,
    };

    const create = {
      user_id: userToken.user_id,
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      country: value.country,
      bank_name: value.bank_name,
      account_number: value.account_number,
      ifsc_code: value.ifsc_code,
      document_type: value.document_type,
      document_number: value.document_number,
      reason: value.reason,
    };

    const recipientQuery = await query
      .table("recipients")
      .findOrCreate(find, create);

    const details = {
      email: recipientQuery.record.email === value.email ? value.email : null,
      phone: recipientQuery.record.phone === value.phone ? value.phone : null,
    };

    if (recipientQuery.count > 0) {
      return res.status(http.RECIPIENT_CONFLICT.code).json({
        ...http.RECIPIENT_CONFLICT,
        details: { match: details },
      });
    }

    return res.status(http.RECIPIENT_CREATED.code).json({
      ...http.RECIPIENT_CREATED,
      result: {
        recipient: recipientQuery.record,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const editRecipient = async (req, res) => {
  try {
    const { value, error } = validation.editRecipient.validate({
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      bank_name: req.body.bank_name,
      account_number: req.body.account_number,
      ifsc_code: req.body.ifsc_code,
      document_type: req.body.document_type,
      document_number: req.body.document_number,
      reason: req.body.reason,
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_token: value.user_token } },
      });
    }

    const find = {
      id: value.id,
      user_id: userToken.user_id,
    };

    const update = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      country: value.country,
      bank_name: value.bank_name,
      account_number: value.account_number,
      ifsc_code: value.ifsc_code,
      document_type: value.document_type,
      document_number: value.document_number,
      reason: value.reason,
    };

    const recipientQuery = await query
      .table("recipients")
      .findOrUpdate(find, update);

    if (!recipientQuery.count) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_match: { id: value.id } },
      });
    }

    return res.status(http.RECIPIENT_UPDATED.code).json({
      ...http.RECIPIENT_UPDATED,
      result: {
        user: recipientQuery.record,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

const deleteRecipient = async (req, res) => {
  try {
    const { value, error } = validation.deleteRecipient.validate({
      id: req.body.id,
      user_token: req.body.user_token,
    });

    if (error) {
      return res
        .status(http.BAD_REQUEST.code)
        .json({ ...http.BAD_REQUEST, details: { error: error.message } });
    }

    const userToken = jwt.verify(value.user_token);

    if (!userToken) {
      return res.status(http.UNAUTHORIZED.code).json({
        ...http.UNAUTHORIZED,
        details: { no_match: { user_token: value.user_token } },
      });
    }

    const find = {
      id: value.id,
      user_id: userToken.user_id,
    };

    const recipientQuery = await db.table("recipients").findOrDelete(find);

    if (recipientQuery.count < 1) {
      return res.status(http.RECIPIENT_NOT_FOUND.code).json({
        ...http.RECIPIENT_NOT_FOUND,
        details: { no_match: { id: value.id } },
      });
    }

    return res.status(http.RECIPIENT_DELETED.code).json(http.RECIPIENT_DELETED);
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

export {
  recipients,
  recipientFind,
  addRecipient,
  editRecipient,
  deleteRecipient,
};
