const express = require("express");

const router = express.Router();

const {
  createLecture,
  getLectures,
  getMyLectures,
} = require("../controllers/lectureController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  adminOnly,
  getLectures
);

router.post(
  "/",
  protect,
  adminOnly,
  createLecture
);

router.get(
  "/my-lectures",
  protect,
  getMyLectures
);

module.exports = router;