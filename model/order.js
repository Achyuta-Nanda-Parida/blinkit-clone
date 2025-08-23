// models/order.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
  // required: true
}],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      // required: true,
      minlength: 5
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: true
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true
    },
    delivery: {
  type: String,
  required: true
}
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateOrder(order) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    products: Joi.string().hex().length(24).required(),
    totalPrice: Joi.number().min(0).required(),
    address: Joi.string().min(5).required(),
    status: Joi.string()
      .valid("pending", "processing", "shipped", "delivered", "cancelled")
      .required(),
    payment: Joi.string().hex().length(24).required(),
    delivery: Joi.string().hex().length(24).required()
  });

  return schema.validate(order);
}

// ===== Export Model and Validation =====
const orderModel = mongoose.model("order", orderSchema);

module.exports = {orderModel , validateOrder };
