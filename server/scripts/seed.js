require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const connectDB = require("../config/db");

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany({});

    const hashedAdminPassword =
      await bcrypt.hash("Admin@123", 10);

    const hashedInstructorPassword =
      await bcrypt.hash("Instructor@123", 10);

    await User.create([
      {
        name: "Admin User",
        email: "admin@lecture.com",
        password: hashedAdminPassword,
        role: "admin",
      },

      {
        name: "Rahul Sharma",
        email: "rahul@lecture.com",
        password: hashedInstructorPassword,
        role: "instructor",
      },

      {
        name: "Priya Patel",
        email: "priya@lecture.com",
        password: hashedInstructorPassword,
        role: "instructor",
      },

      {
        name: "Amit Kumar",
        email: "amit@lecture.com",
        password: hashedInstructorPassword,
        role: "instructor",
      },
    ]);

    console.log("Users seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedUsers();