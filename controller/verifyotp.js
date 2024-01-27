const User = require('../models/userschema');

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(otp)
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

   
    // Check if the OTP matches
    if (user.Otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update the user's isVerified field to true
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error verifying OTP', error: error.message });
  }
};

module.exports = verifyOTP;