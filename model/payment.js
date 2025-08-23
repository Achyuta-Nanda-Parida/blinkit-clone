// models/payment.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    }
  },
  { timestamps: true }
);


// ===== Export Model and Validation =====
const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = { paymentModel };
