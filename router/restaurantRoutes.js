const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurants/restaurantController');

router.post('/create', restaurantController.create);
router.get('/list', restaurantController.list);
router.put('/update', restaurantController.update);
router.delete('/delete', restaurantController.delete);

module.exports = router;