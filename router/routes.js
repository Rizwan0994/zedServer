// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/superAdmin/userController');

router.post('/login', userController.login);

module.exports = router;