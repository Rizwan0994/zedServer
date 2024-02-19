// models/orderSchema.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number }],
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  total: Number,
  sub_total: Number,
  delivery_fee: Number,
  delivery_address: String,
  special_note: String,
  payment_method: String,
  order_status: { type: String, enum: ['accepted', 'cooking', 'out_for_delivery', 'delivered', 'rejected'], default: 'accepted' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);