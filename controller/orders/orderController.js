// controllers/orderController.js

const Order = require('../../models/orderSchema');

const orderController = {
  placeOrder: async (req, res) => {
    try {
      const { items, restaurant, customer, total, sub_total, delivery_fee, delivery_address, special_note, payment_method } = req.body;
      const newOrder = new Order({ items, restaurant, customer, total, sub_total, delivery_fee, delivery_address, special_note, payment_method });
      const savedOrder = await newOrder.save();
      res.status(200).json({ success: true, order: savedOrder });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error placing order', error: error.message });
    }
  },

  getAllMyOrders: async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await Order.find({ customer: userId });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting orders', error: error.message });
    }
  },

  getAllRestaurantOrders: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const orders = await Order.find({ restaurant: restaurantId });
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting orders', error: error.message });
    }
  },

  getOrderDetails: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting order details', error: error.message });
    }
  },

  getActiveOrder: async (req, res) => {
    try {
      const { userId } = req.params;
      const order = await Order.findOne({ customer: userId, order_status: { $ne: 'delivered' } });
      if (!order) {
        return res.status(404).json({ success: false, message: 'No active orders' });
      }
      res.status(200).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting active order', error: error.message });
    }
  },
};

module.exports = orderController;