const Stripe = require('stripe');
const stripe = Stripe("sk_test_51Muy0GHaLC1wsFOq7ivBQ5PyLAdWpyhni8BrGDhgKUE3QSmrmaZZ00JdApKQESUcoaiH0YC9kzGFJRb1V0Adq09m004ESmaVsd");
const Order = require('../../models/orderSchema');

const paymentController = {
  // Create a payment intent
  createPaymentIntent: async (req, res) => {
    try {
      const { amount, currency } = req.body;

      // Create a PaymentIntent with the amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // amount in cents
        currency,
        payment_method_types: ['card'],
      });

      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error creating payment intent', error: error.message });
    }
  },

  // Handle the payment confirmation
  confirmPayment: async (req, res) => {
    try {
      const { paymentIntentId, orderId } = req.body;

      // Retrieve the PaymentIntent
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Update the order status upon successful payment
      if (paymentIntent.status === 'succeeded') {
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.payment_method = 'Stripe';
        order.order_status = 'paid';
        await order.save();

        res.status(200).json({ success: true, order });
      } else {
        res.status(400).json({ success: false, message: 'Payment not successful' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error confirming payment', error: error.message });
    }
  },
};

module.exports = paymentController;
