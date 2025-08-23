// models/delivery.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    deliveryBoy: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "out-for-delivery", "delivered", "cancelled"],
      default: "pending",
      required: true
    },
    trackingURL: {
      type: String,
      match: /^https?:\/\/.+/,
      required: false
    },
    estimatedDeliveryTime: {
      type: Number, // in hours or minutes, depending on your logic
      min: 0,
      required: false
    }
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateDelivery(delivery) {
  const schema = Joi.object({
    order: Joi.string().hex().length(24).required(), // MongoDB ObjectId
    deliveryBoy: Joi.string().min(3).max(50).required(),
    status: Joi.string()
      .valid("pending", "out-for-delivery", "delivered", "cancelled")
      .required(),
    trackingURL: Joi.string().uri().optional(),
    estimatedDeliveryTime: Joi.number().min(0).optional()
  });

  return schema.validate(delivery);
}

// ===== Export Model and Validation =====
const deliveryModel = mongoose.model("delivery", deliverySchema);

module.exports = { deliveryModel, validateDelivery };
