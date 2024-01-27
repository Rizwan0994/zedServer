const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneNumber: String,
  isOpen: Boolean,
  restaurantId: String,
  items: [String],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);