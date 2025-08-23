// models/product.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
   category: {
  type: String,
  required: true
  },
    stock: {
      type: Number,
      default: true
    },
    description: {
      type: String,
    },
    image: {
      type: Buffer,
    //   match: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i // Basic image URL validation
    }
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(3).max(90).required(),
    stock: Joi.number().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional()
  });

  return schema.validate(product);
}

// ===== Export Model and Validation =====
const productModel = mongoose.model("Product", productSchema);

module.exports = { productModel, validateProduct };
