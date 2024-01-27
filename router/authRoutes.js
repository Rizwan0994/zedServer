const express = require('express');
const bodyParser = require('body-parser');
const signupController = require('../controller/signupController');
const signinController = require('../controller/signinController');
const verifyOTPOtp = require('../controller/verifyotp');
const resendOTPController = require('../controller/resendOTPController');
const resetPasswordController = require('../controller/resetPasswordController');
const router = express.Router();
const cors = require('cors');
router.use(bodyParser.json());
router.use(cors());
// Signup: Add a new user
router.post('/signup', signupController);

// Signin: Authenticate a user
router.get('/signin', signinController);
// Verify send otp by email
router.get('/verify',verifyOTPOtp)
// Resend OTP
router.post('/resendOTP', resendOTPController);
// Reset password
router.post('/resetPassword', resetPasswordController);

module.exports = router;
