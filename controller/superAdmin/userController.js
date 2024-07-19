const jwt = require('jsonwebtoken');
const SuperAdmin = require('../../models/superAdminSchema');
const Restaurant = require('../../models/restaurantSchema');

const userController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await Restaurant.findOne({ email });
      let userType = 'RestaurantOwner';
      if (!user) {
        user = await SuperAdmin.findOne({ email });
        userType = 'SuperAdmin';
      }

      if (!user || user.password !== password) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      const secretKey = userType === 'SuperAdmin' ? 'zedAppAdmin' : 'zedAppResturant';
      const token = jwt.sign({ _id: user._id, userType }, secretKey); // Include userType in the payload
      return res.header('auth-token', token).status(200).json({ success: true, user, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
  },
};

module.exports = userController;