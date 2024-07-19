// index.js

const express = require('express');
const http = require('http');
const authRoutes = require('./router/authRoutes');
const connectDB = require('./connection/db');
const restaurantRoutes = require('./router/restaurantRoutes');
const orderRoutes = require('./router/orderRoutes');
const superAdminRoutes = require('./router/superAdminRoutes');
const userRoutes = require('./router/routes');
const bodyParser = require('body-parser');
const socket = require('./socket');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});
app.use(express.json());
// Use authentication routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/superAdmin', superAdminRoutes);
app.get('/', (req, res) => {
  res.send('ZedApp Api Serverr Running!');
});

const PORT = process.env.PORT || 443;
const server = app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

socket.init(server);