const User = require('../models/userschema');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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

    // Create a token
    const token = jwt.sign({ id: user._id }, 'zedApp', { expiresIn: '1h' });

    // Return success message, user data and token
    res.status(200).json({ success: true, message: 'Sign in successful', user: user, token: token });
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