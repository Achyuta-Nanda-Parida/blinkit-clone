// models/category.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      unique: true
    }
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required()
  });

  return schema.validate(category);
}

// ===== Export Model and Validation =====
const categoryModel = mongoose.model("category", categorySchema);

module.exports = { categoryModel, validateCategory };
