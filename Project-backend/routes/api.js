const express = require('express');
const router = express.Router();
const Auth = require('../middleware/Auth');

// /* Authentication */
// const AuthController = require('../controllers/api/AuthController');
// router.post('/send_otp', AuthController.sendOtp);
// // router.post('/verify_otp', AuthController.verifyOtp);

module.exports = router;