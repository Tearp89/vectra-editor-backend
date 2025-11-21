const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/validate-token', authController.validateToken);

module.exports = router;
