// controllers/orderController.js

const jwt = require('jsonwebtoken');
const Order = require('../../models/orderSchema');
const Restaurant = require('../../models/restaurantSchema');

const orderController = {
  placeOrder: async (req, res) => {
    try {
      const { items, price, restaurant } = req.body;
      console.log(req.body);
      const token = req.header('auth-token');
      const decoded = jwt.verify(token, 'zedApp');
      const activeOrder = await Order.findOne({ customer: decoded._id, order_status: { $ne: 'delivered' } });

      if (activeOrder) {
        return res.status(400).json({ success: false, message: 'You already have an active order' });
      }

      const restaurantfind = await Restaurant.findById(restaurant);
      if (!restaurantfind) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }

      const newOrder = new Order({ items, price, restaurant: restaurantfind._id, customer: decoded._id });
      const savedOrder = await newOrder.save();
      res.status(200).json({ success: true, order: savedOrder });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error placing order', error: error.message });
    }
  },

  getAllMyOrders: async (req, res) => {
    try {
      const token = req.header('auth-token');
      const decoded = jwt.verify(token, 'zedApp');
      const orders = await Order.find({ customer: decoded._id }).sort({ createdAt: -1 }).select('-restaurant');
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting orders', error: error.message });
    }
  },

  getAllRestaurantOrders: async (req, res) => {
    try {
      const { restaurantId } = req.body;
      const orders = await Order.find({ restaurant: restaurantId }).populate('restaurant');
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error getting orders', error: error.message });
    }
  },

  getOrderDetails: async (req, res) => {
    try {
      const { orderId } = req.body;
      
      const order = await Order.findById(orderId).populate('items').populate('restaurant');
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
      const token = req.header('auth-token');
      const decoded = jwt.verify(token, 'zedApp');
      const order = await Order.findOne({ customer: decoded._id, order_status: { $ne: 'delivered' } }).populate('restaurant');
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
