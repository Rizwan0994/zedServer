const User = require('../models/userschema');
const crypto = require('crypto');

const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist or password is incorrect, return error
    if (!user || !comparePasswords(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(401).json({ success: false, message: 'User not verified. Please complete the signup process.' });
    }

    // Return success message or user data
    res.status(200).json({ success: true, message: 'Sign in successful', user: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error signing in', error: error.message });
  }
};

// Function to compare passwords
const comparePasswords = (password, hashedPassword) => {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash === hashedPassword;
};

module.exports = signinController;
