// models/user.js
const mongoose = require("mongoose");
const Joi = require('joi');

// ===== Mongoose Schema with Validations =====
const AddressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  zip: {
    type: Number,
    required: true,
    min: 100000,
    max: 999999
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  }
});

const userSchema = new mongoose.Schema(
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
      minlength: 6
    },
    phone: {
      type: Number,
      min: 1000000000,
      max: 9999999999
    },
    addresses: {
      type: [AddressSchema],
      
        message: "At least one address is required"
      }
    // }
  },
  { timestamps: true }
);

// ===== Joi Validation Function =====
function validateUser(user) {
  const addressSchema = Joi.object({
    state: Joi.string().min(2).required(),
    zip: Joi.number().integer().min(100000).max(999999).required(),
    city: Joi.string().min(2).required(),
    address: Joi.string().min(5).required()
  });

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
    addresses: Joi.array().items(addressSchema).min(1).required()
  });

  return schema.validate(user);
}

// ===== Export Model and Validation =====
const userModel = mongoose.model("user", userSchema);

module.exports = { userModel, validateUser };
