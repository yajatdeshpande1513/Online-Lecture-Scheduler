const Lecture = require("../models/Lecture");

const createLecture = async (req, res) => {
  try {
    const {
      course,
      instructor,
      lectureDate,
    } = req.body;

    if (!course || !instructor || !lectureDate) {
      return res.status(400).json({
        message:
          "Course, instructor and lecture date are required.",
      });
    }

    // Check if instructor already has a lecture
    // on this date
    const existingLecture = await Lecture.findOne({
      instructor,
      lectureDate,
    });

    if (existingLecture) {
      return res.status(409).json({
        message:
          "Scheduling conflict! This instructor already has a lecture assigned on this date.",
      });
    }

    const lecture = await Lecture.create({
      course,
      instructor,
      lectureDate,
    });

    res.status(201).json({
      message: "Lecture scheduled successfully",
      lecture,
    });
  } catch (error) {

    // Database-level duplicate protection
    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "Scheduling conflict! This instructor is already assigned on this date.",
      });
    }

    res.status(500).json({
      message: "Failed to schedule lecture",
      error: error.message,
    });
  }
};

const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("course")
      .populate("instructor", "name email");

    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lectures",
    });
  }
};

const getMyLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      instructor: req.user._id,
    })
      .populate("course")
      .sort({
        lectureDate: 1,
      });

    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lectures",
    });
  }
};

module.exports = {
  createLecture,
  getLectures,
  getMyLectures,
};