const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: true,
  },
  otpTimestamp: {
    type: Date,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
