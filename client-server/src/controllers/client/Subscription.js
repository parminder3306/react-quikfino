import hash from "../../utils/Hash.js";
import http from "../../utils/Http.js";
import jwt from "../../utils/JWT.js";
import mail from "../../utils/Mail.js";
import db from "../../utils/DBHelper.js";
import validation from "../../utils/Validation.js";

// Get Subscription - Retrieves the subscription details for the authenticated user
const getSubscription = async (req, res) => {
  try {
    const { value, error } = validation.getSubscription.validate({
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

    const find = { user_id: userToken.user_id };
    const subscriptionQuery = await db.table("subscriptions").findOne(find);

    if (!subscriptionQuery) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_subscription: { user_id: userToken.user_id } },
      });
    }

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Subscription found successfully.",
      result: {
        subscription: subscriptionQuery,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

// Update Subscription - Allows the user to update their subscription plan
const updateSubscription = async (req, res) => {
  try {
    const { value, error } = validation.updateSubscription.validate({
      user_token: req.body.user_token,
      plan_id: req.body.plan_id,
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

    const find = { user_id: userToken.user_id };
    const subscriptionQuery = await db.table("subscriptions").findOne(find);

    if (!subscriptionQuery) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_subscription: { user_id: userToken.user_id } },
      });
    }

    const update = {
      plan_id: value.plan_id, // Updating to the new subscription plan
      updated_at: new Date(),
    };

    await db.table("subscriptions").findOrUpdate(find, update);

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Subscription updated successfully.",
      result: {
        subscription: { plan_id: value.plan_id },
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

// Get Subscription Plans - Retrieves all available subscription plans
const getSubscriptionPlans = async (req, res) => {
  try {
    const plans = await db.table("subscription_plans").find();

    if (!plans || plans.length === 0) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_plans: "No subscription plans found." },
      });
    }

    return res.status(http.SUCCESS.code).json({
      status: "SUCCESS",
      message: "Subscription plans found successfully.",
      result: {
        plans,
      },
    });
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

// Payment Processing - Handles payment for subscription renewal or upgrade
const processPayment = async (req, res) => {
  try {
    const { value, error } = validation.processPayment.validate({
      user_token: req.body.user_token,
      amount: req.body.amount,
      payment_method: req.body.payment_method,
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

    const find = { user_id: userToken.user_id };
    const subscriptionQuery = await db.table("subscriptions").findOne(find);

    if (!subscriptionQuery) {
      return res.status(http.NOT_FOUND.code).json({
        ...http.NOT_FOUND,
        details: { no_subscription: { user_id: userToken.user_id } },
      });
    }

    // Process payment logic (e.g., call to a payment gateway)
    // Assuming payment was successful:
    const paymentSuccess = true;

    if (paymentSuccess) {
      // Update subscription renewal date, balance, etc.
      const update = {
        next_payment_due: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Next payment in 30 days
        payment_status: "Paid",
      };

      await db.table("subscriptions").findOrUpdate(find, update);

      return res.status(http.SUCCESS.code).json({
        status: "SUCCESS",
        message: "Payment processed successfully.",
        result: {
          subscription: { next_payment_due: update.next_payment_due },
        },
      });
    } else {
      return res.status(http.PAYMENT_FAILED.code).json({
        ...http.PAYMENT_FAILED,
        details: { error: "Payment processing failed" },
      });
    }
  } catch (error) {
    return res.status(http.INTERNAL_SERVER_ERROR.code).json({
      ...http.INTERNAL_SERVER_ERROR,
      details: { error: error.message },
    });
  }
};

// Exporting all functions
export { getSubscription, updateSubscription, getSubscriptionPlans, processPayment };
