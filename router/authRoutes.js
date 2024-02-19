const express = require('express');

const signupController = require('../controller/signupController');
const signinController = require('../controller/signinController');
const verifyOTPOtp = require('../controller/verifyotp');
const resendOTPController = require('../controller/resendOTPController');
const resetPasswordController = require('../controller/resetPasswordController');
const verifyOTPAndResetPassword = require('../controller/verifyOTPAndResetPassword');
const router = express.Router();

// Signup: Add a new user
router.post('/signup', signupController);

// Signin: Authenticate a user
router.post('/signin', signinController);
// Verify send otp by email
router.post('/verify',verifyOTPOtp)
// Resend OTP
router.post('/resendOTP', resendOTPController);
// Reset password
router.post('/resetPassword', resetPasswordController);
// Verify OTP and reset password
router.post('/verifyOTPAndResetPassword', verifyOTPAndResetPassword);

module.exports = router;
