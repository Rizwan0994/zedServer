// superAdminSchema.js
const mongoose = require('mongoose');
const superAdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, default: 'SuperAdmin' },
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
