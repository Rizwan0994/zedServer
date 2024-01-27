const crypto = require('crypto');
const User = require('../models/userschema');
const { generateOTP, sendOTPByEmail } = require('../controller/authMiddleware');

const signupController = async (req, res) => {
  try {
    const { name, mobileNumber, password, email } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash the password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create a new user
    const newUser = new User({ name, mobileNumber, email, password: hashedPassword, Otp: otp });
    const savedUser = await newUser.save();

    // Send the OTP via email
    await sendOTPByEmail(email, otp);

    res.status(200).json({ success: true, message: 'OTP sent successfully. please Verify!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error signing up', error: error.message });
  }
};

module.exports = signupController;
