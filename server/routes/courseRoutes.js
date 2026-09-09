const express = require("express");

const router = express.Router();

const {
  createCourse,
  getCourses,
} = require("../controllers/courseController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/", protect, getCourses);

router.post(
  "/",
  protect,
  adminOnly,
  createCourse
);

module.exports = router;