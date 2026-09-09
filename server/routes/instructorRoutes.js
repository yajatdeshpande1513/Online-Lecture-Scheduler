const express = require("express");

const router = express.Router();

const {
  getInstructors,
} = require("../controllers/instructorController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getInstructors);

module.exports = router;