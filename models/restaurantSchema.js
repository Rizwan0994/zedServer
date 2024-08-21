const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  price: Number
});

const restaurantSchema = new Schema({
  name: String,
  address: String,
  phoneNumber: String,
  isOpen: Boolean,
  restaurantId: { type: String, unique: true },
  items: [itemSchema],
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, default: 'RestaurantOwner' },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
