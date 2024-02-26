// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller//orders/orderController');
const verifyToken = require('../middlewares/verifyToken');
router.post('/place',verifyToken, orderController.placeOrder);
router.get('/my-orders/:userId',verifyToken, orderController.getAllMyOrders);
router.get('/restaurant-orders/:restaurantId',verifyToken, orderController.getAllRestaurantOrders);
router.get('/details/:orderId',verifyToken, orderController.getOrderDetails);
router.get('/active/:userId',verifyToken, orderController.getActiveOrder);

module.exports = router;