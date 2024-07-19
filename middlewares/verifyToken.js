const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/superAdminSchema'); // Import your user models
const RestaurantOwner = require('../models/restaurantSchema');
const UserModel = require('../models/userschema');

const verifyToken = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ success: false, message: 'Access denied' });

  let decoded;
  try {
    decoded = jwt.verify(token, 'zedAppAdmin');
    const admin = await SuperAdmin.findById(decoded._id); // Check if user exists in the database
    if (!admin || admin.userType !== 'SuperAdmin') throw new Error('Access denied');
  } catch (error) {
    try {
      decoded = jwt.verify(token, 'zedAppResturant');
          console.log(decoded);
      const restaurantOwner = await RestaurantOwner.findById(decoded._id); // Check if user exists in the database
      console.log(restaurantOwner);
      if (!restaurantOwner || restaurantOwner.userType !== 'RestaurantOwner') throw new Error('Access denied');
    } catch (error) {
      try {
        decoded = jwt.verify(token, 'zedApp');
        console.log(decoded.id);
        const user = await UserModel.findById(decoded.id); // Check if user exists in the database
        //console.log(user);
        if (!user || user.userType !== 'user') throw new Error('Access denied');
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ success: false, message: 'Token expired' });
        } else if (error instanceof jwt.JsonWebTokenError || error.message === 'Access denied') {
          return res.status(401).json({ success: false, message: 'Invalid token' });
        } else {
          throw error;
        }
      }
    }
  }

  req.user = decoded;
  next();
};

module.exports = verifyToken;