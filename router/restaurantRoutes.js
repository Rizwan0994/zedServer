const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurants/restaurantController');
const verifyToken = require('../middlewares/verifyToken');
const checkAdmin = (req, res, next) => {
    if (req.user.userType !== 'SuperAdmin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
router.post('/create', verifyToken,checkAdmin,  restaurantController.create);
router.get('/list',  restaurantController.list);
router.get('/:restaurantId', verifyToken, restaurantController.findById);
router.put('/update', verifyToken, restaurantController.update);
router.delete('/delete', verifyToken,checkAdmin,restaurantController.delete);
// router.post('/login', restaurantController.login);
router.post('/addItem', verifyToken, restaurantController.addItem);

module.exports = router;


