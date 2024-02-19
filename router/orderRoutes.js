// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/place', orderController.placeOrder);
router.get('/my-orders/:userId', orderController.getAllMyOrders);
router.get('/restaurant-orders/:restaurantId', orderController.getAllRestaurantOrders);
router.get('/details/:orderId', orderController.getOrderDetails);
router.get('/active/:userId', orderController.getActiveOrder);

module.exports = router;