// const User = require('../models/userschema');
// const { generatePassword, sendPasswordByEmail } = require('./authMiddleware');
// const crypto = require('crypto');

// const resetPasswordController = async (req, res) => {
//     try {
//       const { email } = req.body;
//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ success: false, message: 'User not found' });
//       }
  
//       // Generate a new password
//       const newPassword = generatePassword(); 
  
//       // Hash the new password
//       const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
  
//       // Update the user's password in the database
//       user.password = hashedPassword;
//       await user.save();
  
//       // Send the new password via email
//       await sendPasswordByEmail(email, newPassword); 
  
//       res.status(200).json({ success: true, message: 'New password sent successfully. Please check your email!' });
//     } catch (error) {
//       res.status(500).json({ success: false, message: 'Error resetting password', error: error.message });
//     }
//   };
  
//   module.exports = resetPasswordController;

//....simple
const User = require('../models/userschema');
const crypto = require('crypto');
const { generateOTP, sendOTPByEmail } = require('./authMiddleware');

const resetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Generate an OTP
    const otp = generateOTP();

    // Save the OTP and the timestamp in the user's document
    user.otp = otp;
    user.otpTimestamp = new Date().getTime();
    await user.save();

    // Send the OTP via email
    await sendOTPByEmail(email, otp);

    res.status(200).json({ success: true, message: 'OTP sent successfully. Please check your email!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending OTP', error: error.message });
  }
};

module.exports = resetPasswordController;