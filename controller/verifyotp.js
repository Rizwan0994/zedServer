const User = require('../models/userschema');

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User is already verified' });
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Check if OTP is expired (you should adjust the expiration time as needed)
    const otpExpirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    const currentTime = new Date().getTime();

    if (user.otpTimestamp && currentTime - user.otpTimestamp > otpExpirationTime) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    // Update the user's isVerified field to true
    user.isVerified = true;

    // Clear the OTP and its timestamp upon successful verification
    user.otp = undefined;
    user.otpTimestamp = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error verifying OTP', error: error.message });
  }
};

module.exports = verifyOTP;
