const crypto = require('crypto');
const User = require('../models/userschema');
const { generateOTP, sendOTPByEmail } = require('../controller/authMiddleware');

const signupController = async (req, res) => {
  try {
    const { name, mobileNumber, password, email } = req.body;

    // Check if the email is already in use
    let existingUser = await User.findOne({ email });

    // Declare currentTime outside the if statement
    const currentTime = new Date().getTime();

    // Check if the existing user is verified or not
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ success: false, message: 'User already exists and is verified' });
      } else {
        // Generate a new OTP for the existing unverified user
        const otp = generateOTP();
        existingUser.otp = otp;
        existingUser.otpTimestamp = currentTime; // Update the timestamp
        await existingUser.save();

        // Send the OTP via email
        await sendOTPByEmail(email, otp);

        return res.status(200).json({ success: true, message: 'OTP sent successfully. Please verify!' });
      }
    }

    // Generate OTP for new user
    const otp = generateOTP();

    // Hash the password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create a new user
    const newUser = new User({ name, mobileNumber, email, password: hashedPassword, otp, otpTimestamp: currentTime });

    try {
      const savedUser = await newUser.save();
      // Send the OTP via email
      await sendOTPByEmail(email, otp);

      res.status(200).json({ success: true, message: 'OTP sent successfully. Please verify!' });
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key error (email already exists)
        return res.status(400).json({ success: false, message: 'Number already exists' });
      }
      throw error; // Re-throw other errors
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error signing up', error: error.message });
  }
};

module.exports = signupController;
