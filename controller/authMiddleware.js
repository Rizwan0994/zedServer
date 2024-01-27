const nodemailer = require('nodemailer');

// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

async function sendOTPByEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service, e.g., 'Gmail'
    auth: {
      user: 'xshown123@gmail.com',
      pass: 'zmrf kqwb xyxw eyyr', // Provide your email password
    },
  });

  const mailOptions = {
    from: 'xshown123@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email', error);
    throw error;
  }
}

// Function to generate a random password
const generatePassword = () => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

async function sendPasswordByEmail(email, password) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service, e.g., 'Gmail'
    auth: {
      user: 'xshown123@gmail.com',
      pass: 'zmrf kqwb xyxw eyyr', // Provide your email password
    },
  });

  const mailOptions = {
    from: 'xshown123@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Your new password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password email sent successfully');
  } catch (error) {
    console.error('Error sending password email', error);
  }
};

module.exports = { generateOTP, sendOTPByEmail, generatePassword, sendPasswordByEmail};
