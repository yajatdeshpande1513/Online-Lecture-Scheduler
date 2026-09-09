const User = require("../models/User");

const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({
      role: "instructor",
    }).select("-password");

    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch instructors",
      error: error.message,
    });
  }
};

module.exports = {
  getInstructors,
};