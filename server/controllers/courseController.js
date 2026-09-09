const Course = require("../models/Course");

const createCourse = async (req, res) => {
  try {
    const {
      name,
      level,
      description,
      image,
    } = req.body;

    if (!name || !level || !description) {
      return res.status(400).json({
        message: "Name, level and description are required.",
      });
    }

    const course = await Course.create({
      name,
      level,
      description,
      image,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({
      createdAt: -1,
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
};