// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Auth } = require('../models'); // Adjust path if needed
const transporter = require('../config/mail');
const { welcomeEmailTemplate } = require('../templates/welcomeEmail');
const { verificationEmailTemplate } = require('../templates/verificationEmail');
const { resetPasswordEmailTemplate } = require('../templates/resetPasswordEmail');

const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRETE;
if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Set process.env.JWT_SECRET for production.');
}

function cookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "Please provide all required details" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: registerUser.id }, JWT_SECRET, { expiresIn: "7d" });

    // Optionally store token server-side
    if (Auth) {
      try {
        await Auth.create({ user_id: registerUser.id, token });
      } catch (e) {
        console.error('Auth record creation failed (non-fatal):', e);
      }
    }

    res.cookie('token', token, cookieOptions());

    // Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to VY Foundation - Your Account is Ready! 🤝",
        html: welcomeEmailTemplate(name, email)
      });
    } catch (e) {
      console.error('Failed to send welcome email (non-fatal):', e);
    }

    return res.status(201).json({
      success: true,
      message: "Welcome to VY Foundation! Your account has been created successfully."
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: "Registration failed. Please try again." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide both email and password" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "No account found with this email address" });
    }

    const matchPass = await bcrypt.compare(password, existingUser.password);
    if (!matchPass) {
      return res.status(401).json({ success: false, message: "Invalid password. Please try again." });
    }

    const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, { expiresIn: "7d" });

    if (Auth) {
      try {
        await Auth.create({ user_id: existingUser.id, token });
      } catch (e) {
        console.error('Failed to store auth token (non-fatal):', e);
      }
    }

    res.cookie('token', token, cookieOptions());

    return res.json({
      success: true,
      message: `Welcome back to VY Foundation, ${existingUser.name}!`
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
};

exports.logOut = async (req, res) => {
  try {
    // Clear server-side auth record if token exists and Auth model present
    try {
      const token = req.cookies?.token;
      if (token && Auth) {
        await Auth.destroy({ where: { token } });
      }
    } catch (e) {
      console.error('Failed to delete auth record (non-fatal):', e);
    }

    res.clearCookie('token', cookieOptions());
    return res.json({
      success: true,
      message: "You have been successfully logged out. Thank you for using VY Foundation."
    });
  } catch (error) {
    console.error('Logout Error:', error);
    return res.status(500).json({ success: false, message: "Logout failed. Please try again." });
  }
};

exports.sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: "User account not found" });

    if (user.is_account_verified) {
      return res.json({ success: false, message: "Your VY Foundation account is already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    await user.update({
      verify_otp: otp,
      verify_otp_expire_at: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "VY Foundation - Verify Your Account 🔐",
      html: verificationEmailTemplate(user.name, otp)
    });

    return res.json({ success: true, message: "Verification code sent to your email. Please check your inbox." });
  } catch (error) {
    console.error('Send Verify OTP Error:', error);
    return res.status(500).json({ success: false, message: "Failed to send verification code. Please try again." });
  }
};

exports.verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!otp) return res.status(400).json({ success: false, message: "Please enter the verification code" });

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: "User account not found" });

    if (!user.verify_otp || user.verify_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid verification code. Please try again." });
    }

    if (user.verify_otp_expire_at < Date.now()) {
      return res.status(400).json({ success: false, message: "Verification code has expired. Please request a new one." });
    }

    await user.update({
      is_account_verified: true,
      verify_otp: '',
      verify_otp_expire_at: 0
    });

    return res.json({ success: true, message: "Congratulations! Your VY Foundation account has been successfully verified." });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({ success: false, message: "Verification failed. Please try again." });
  }
};

exports.isUserAuthenticate = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ success: false, message: "User session invalid" });

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: !!user.is_account_verified
      },
      message: "User is authenticated"
    });
  } catch (error) {
    console.error('Authentication Check Error:', error);
    return res.status(500).json({ success: false, message: "Authentication check failed" });
  }
};

exports.sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ success: false, message: "Please provide your email address" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: "No VY Foundation account found with this email address" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await user.update({
      reset_otp: otp,
      reset_otp_expire_at: Date.now() + 15 * 60 * 1000 // 15 minutes
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "VY Foundation - Password Reset Code 🔑",
      html: resetPasswordEmailTemplate(user.name, otp)
    });

    return res.json({ success: true, message: "Password reset code sent to your email. Please check your inbox." });
  } catch (error) {
    console.error('Send Reset OTP Error:', error);
    return res.status(500).json({ success: false, message: "Failed to send reset code. Please try again." });
  }
};

exports.verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) return res.status(400).json({ success: false, message: "Please provide both email and verification code" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: "No account found with this email address" });

    if (!user.reset_otp || user.reset_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid reset code. Please try again." });
    }

    if (user.reset_otp_expire_at < Date.now()) {
      return res.status(400).json({ success: false, message: "Reset code has expired. Please request a new one." });
    }

    return res.json({ success: true, message: "Reset code verified successfully. You can now set a new password." });
  } catch (error) {
    console.error('Verify Reset OTP Error:', error);
    return res.status(500).json({ success: false, message: "Code verification failed. Please try again." });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) return res.status(400).json({ success: false, message: "Please provide email, code, and new password" });

  if (newPassword.length < 6) return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: "No account found with this email address" });

    if (!user.reset_otp || user.reset_otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid reset code. Please try again." });
    }

    if (user.reset_otp_expire_at < Date.now()) {
      return res.status(400).json({ success: false, message: "Reset code has expired. Please request a new one." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      reset_otp: '',
      reset_otp_expire_at: 0
    });

    return res.json({ success: true, message: "Your VY Foundation account password has been successfully updated. You can now log in with your new password." });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ success: false, message: "Password reset failed. Please try again." });
  }
};
