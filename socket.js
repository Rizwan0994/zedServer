// socket.js

const socketIo = require('socket.io');
const Order = require('./models/orderSchema');

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIo(httpServer);
    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on(`orderStatusChange`, async ({ orderId, status }) => {
        try {
          const order = await Order.findById(orderId);
          if (!order) {
            return socket.emit('error', 'Order not found');
          }
          order.order_status = status;
          await order.save();
          io.emit(`orderStatusChanged`, { orderId, status });
        } catch (error) {
          socket.emit('error', error.message);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
    return io;
  },

  getIo: () => {
    if (!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  },
};