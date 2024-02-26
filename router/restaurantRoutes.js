const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurants/restaurantController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');
router.post('/create', verifyAdmin,  restaurantController.create);
router.get('/list', verifyToken, restaurantController.list);
router.get('/:restaurantId', verifyToken, restaurantController.findById);
router.put('/update', verifyToken, restaurantController.update);
router.delete('/delete',verifyAdmin,  verifyToken, restaurantController.delete);
router.post('/login', restaurantController.login);
router.post('/addItem', verifyToken, restaurantController.addItem);

module.exports = router;


