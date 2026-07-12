const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/sendEmail");

// ================= REGISTER =================

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: new Date(Date.now() + 5 * 60 * 1000),
      isVerified: false,
    });

    await sendEmail(
      email,
      "Resume Analyzer - Email Verification",
      `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Email Verification</h2>

        <p>Hello <b>${name}</b>,</p>

        <p>Your verification OTP is:</p>

        <h1 style="color:#2563eb;">${otp}</h1>

        <p>This OTP is valid for <b>5 minutes</b>.</p>

      </div>
      `
    );

    return res.status(200).json({
      message: "OTP sent successfully",
      email,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= LOGIN =================

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token,
      user,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= VERIFY OTP =================

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    user.isVerified = true;
    user.otp = "";
    user.otpExpires = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Email verified successfully",
      token,
      user,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ================= RESEND OTP =================

exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    await sendEmail(
      email,
      "Resume Analyzer - Email Verification",
      `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Email Verification</h2>

        <p>Hello <b>${user.name}</b>,</p>

        <p>Your new verification OTP is:</p>

        <h1 style="color:#2563eb;">${otp}</h1>

        <p>This OTP is valid for <b>5 minutes</b>.</p>

      </div>
      `
    );

    return res.status(200).json({
      message: "New OTP sent successfully",
      email,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};