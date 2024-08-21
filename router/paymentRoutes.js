const express = require('express');
const router = express.Router();
const paymentController = require('../controller/payments/paymentController');

// Create Payment Intent
router.post('/create-payment-intent', paymentController.createPaymentIntent);

// Confirm Payment
router.post('/confirm-payment', paymentController.confirmPayment);

module.exports = router;
