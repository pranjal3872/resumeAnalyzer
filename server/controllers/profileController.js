const User = require("../models/User");
const Resume = require("../models/Resume");

// ================= GET PROFILE =================

exports.getProfile = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.user.id:", req.user.id);
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const totalResumes = await Resume.countDocuments({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      user,
      totalResumes,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};