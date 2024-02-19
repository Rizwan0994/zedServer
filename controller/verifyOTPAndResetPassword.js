const User = require('../models/userschema');
const crypto = require('crypto');

const verifyOTPAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    // Check if the new password and confirmation password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if the OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Check if OTP is expired
    const otpExpirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTime = new Date().getTime();

    if (user.otpTimestamp && currentTime - user.otpTimestamp > otpExpirationTime) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
    }

    // Hash the new password
    const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

    // Update the user's password in the database
    user.password = hashedPassword;

    // Clear the OTP and its timestamp
    user.otp = undefined;
    user.otpTimestamp = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error resetting password', error: error.message });
  }
};

module.exports = verifyOTPAndResetPassword;