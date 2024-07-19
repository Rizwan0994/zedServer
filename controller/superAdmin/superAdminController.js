const jwt = require('jsonwebtoken');
const SuperAdmin = require('../../models/superAdminSchema');
//not used file..........
const superAdminController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const superAdmin = await SuperAdmin.findOne({ email, password });

      if (!superAdmin) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      // Create and assign token
      const token = jwt.sign({ _id: superAdmin._id, isAdmin: true }, 'zedApp');
      res.header('auth-token', token).status(200).json({ success: true, superAdmin, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
  },
};

module.exports = superAdminController;