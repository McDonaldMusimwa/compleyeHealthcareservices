const express = require('express');
const router = express.Router();
const userController = require('../controller/auth');

router.get('/login', userController.login);

module.exports = router;
