import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

const Courses = () => {
  const [courses, setCourses] =
    useState([]);

  const [form, setForm] = useState({
    name: "",
    level: "Beginner",
    description: "",
    image: "",
  });

  const loadCourses = async () => {
    const response =
      await API.get("/courses");

    setCourses(response.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/courses",
        form
      );

      alert("Course created successfully!");

      setForm({
        name: "",
        level: "Beginner",
        description: "",
        image: "",
      });

      loadCourses();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create course"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Courses</h1>

        <div className="form-card">
          <h2>Add New Course</h2>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Course Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />

            <select
              value={form.level}
              onChange={(e) =>
                setForm({
                  ...form,
                  level: e.target.value,
                })
              }
            >
              <option>Beginner</option>

              <option>Intermediate</option>

              <option>Advanced</option>
            </select>

            <textarea
              placeholder="Course Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              required
            />

            <input
              placeholder="Course Image URL"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
            />

            <button type="submit">
              Create Course
            </button>
          </form>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <div
              className="course-card"
              key={course._id}
            >
              {course.image && (
                <img
                  src={course.image}
                  alt={course.name}
                />
              )}

              <h2>{course.name}</h2>

              <span className="badge">
                {course.level}
              </span>

              <p>
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Courses;