const User = require('../models/userschema');
const { generateOTP, sendOTPByEmail } = require('./authMiddleware');
const resendOTPController = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        // Check if the OTP is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'OTP already verified. You can login.' });
        }

        // Generate a new OTP
        const otp = generateOTP();

        // Update the user's OTP in the database
        user.Otp = otp;
        await user.save();

        // Send the new OTP via email
        await sendOTPByEmail(email, otp);

        res.status(200).json({ success: true, message: 'New OTP sent successfully. Please verify!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error resending OTP', error: error.message });
    }
};

module.exports = resendOTPController;