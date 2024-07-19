// models/orderSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  // items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  items: [{
    name: String,
    quantity: Number
  }],
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  customer: { type: Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  total: Number,
  sub_total: Number,
  delivery_fee: Number,
  delivery_address: String,
  special_note: String,
  payment_method: String,
  order_status: { type: String, enum: ['accepted', 'cooking', 'out_for_delivery', 'delivered', 'rejected'], default: 'accepted' },
}, { timestamps: true });

orderSchema.virtual('readableId').get(function () {
  return `ORD-${this._id.toString().slice(-6).toUpperCase()}`;
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);
