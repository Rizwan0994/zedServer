const mongoose = require('mongoose');
const superAdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);