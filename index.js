const express = require('express');
const authRoutes = require('./router/authRoutes');
const connectDB = require('./connection/db');
const restaurantRoutes = require('./router/restaurantRoutes');
const bodyParser = require('body-parser');
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
app.use('/api/restaurant', restaurantRoutes);
app.get('/', (req, res) => {
  res.send('ZedApp Api Serverr Running!');
});

const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
