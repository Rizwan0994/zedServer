const express = require('express');
const authRoutes = require('./router/authRoutes');
const connectDB = require('./connection/db');
const restaurantRoutes = require('./router/restaurantRoutes');

const app = express();


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
