const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // Email Verification OTP
    otp: {
      type: String,
      default: "",
    },

    otpExpires: {
      type: Date,
    },

    // Forgot Password OTP
    resetOTP: {
      type: String,
      default: "",
    },

    resetOTPExpires: {
      type: Date,
    },
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);