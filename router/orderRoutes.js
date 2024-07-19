// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders/orderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/my-orders', verifyToken, orderController.getAllMyOrders); // for users
router.post('/restaurant-orders', verifyToken, orderController.getAllRestaurantOrders); // for restaurant
router.post('/details', verifyToken, orderController.getOrderDetails); // for users
router.post('/active', verifyToken, orderController.getActiveOrder); // for restaurant
router.post('/place', verifyToken, orderController.placeOrder); // for users

module.exports = router;
