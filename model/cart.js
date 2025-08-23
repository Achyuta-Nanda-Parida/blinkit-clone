// models/cart.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // ✅ array of ObjectIds

    totalPrice: {
      type: Number,
      required: true,
      default:0
    }
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateCart(cart) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(), // MongoDB ObjectId format
    products: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
    totalPrice: Joi.number().default(0).required()
  });

  return schema.validate(cart);
}

// ===== Export Model and Validation =====
const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel, validateCart };
