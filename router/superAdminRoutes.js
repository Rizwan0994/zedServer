const express = require('express');
const router = express.Router();
const superAdminController = require('../controller/superAdmin/superAdminController');
const SuperAdmin = require('../models/superAdminSchema');

// router.post('/login', superAdminController.login);
router.post('/protected/zedApp/create', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a SuperAdmin with the provided email already exists
    const existingSuperAdmin = await SuperAdmin.findOne({ email });
    if (existingSuperAdmin) {
      return res.status(400).json({ success: false, message: 'A SuperAdmin with this email already exists' });
    }

    const superAdmin = new SuperAdmin({ email, password });
    const savedSuperAdmin = await superAdmin.save();
    res.status(200).json({ success: true, superAdmin: savedSuperAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating super admin', error: error.message });
  }
});
module.exports = router;