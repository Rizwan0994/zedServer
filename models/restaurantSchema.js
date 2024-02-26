const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  isOpen: Boolean,
  restaurantId: { type: String, unique: true },
  items: [String],
  ownerEmail: String,
  ownerPassword: String,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);