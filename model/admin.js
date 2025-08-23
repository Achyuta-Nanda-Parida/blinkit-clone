// models/admin.js
const mongoose = require("mongoose");
const Joi = require("joi");

// ===== Mongoose Schema with Validations =====
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "manager"],
      default: "admin",
      required: true
    }
    
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateAdmin(admin) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("superadmin", "admin", "manager").required()
  });

  return schema.validate(admin);
}

// ===== Export Model and Validation =====
const adminModel = mongoose.model("admin", adminSchema);

module.exports = { adminModel, validateAdmin };
