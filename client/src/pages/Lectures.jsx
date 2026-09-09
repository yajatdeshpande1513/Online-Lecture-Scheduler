import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

const Lectures = () => {
  const [courses, setCourses] =
    useState([]);

  const [instructors, setInstructors] =
    useState([]);

  const [lectures, setLectures] =
    useState([]);

  const [form, setForm] = useState({
    course: "",
    instructor: "",
    lectureDate: "",
  });

  const loadData = async () => {
    try {
      const [
        coursesResponse,
        instructorsResponse,
        lecturesResponse,
      ] = await Promise.all([
        API.get("/courses"),
        API.get("/instructors"),
        API.get("/lectures"),
      ]);

      setCourses(coursesResponse.data);

      setInstructors(
        instructorsResponse.data
      );

      setLectures(lecturesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/lectures",
        form
      );

      alert(
        "Lecture scheduled successfully!"
      );

      setForm({
        course: "",
        instructor: "",
        lectureDate: "",
      });

      loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to schedule lecture"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Lecture Scheduling</h1>

        <div className="form-card">
          <h2>Schedule New Lecture</h2>

          <form onSubmit={handleSubmit}>
            <select
              value={form.course}
              onChange={(e) =>
                setForm({
                  ...form,
                  course: e.target.value,
                })
              }
              required
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course._id}
                  value={course._id}
                >
                  {course.name}
                </option>
              ))}
            </select>

            <select
              value={form.instructor}
              onChange={(e) =>
                setForm({
                  ...form,
                  instructor:
                    e.target.value,
                })
              }
              required
            >
              <option value="">
                Select Instructor
              </option>

              {instructors.map(
                (instructor) => (
                  <option
                    key={instructor._id}
                    value={instructor._id}
                  >
                    {instructor.name}
                  </option>
                )
              )}
            </select>

            <input
              type="date"
              value={form.lectureDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  lectureDate:
                    e.target.value,
                })
              }
              required
            />

            <button type="submit">
              Schedule Lecture
            </button>
          </form>
        </div>

        <div className="table-card">
          <h2>Scheduled Lectures</h2>

          <table>
            <thead>
              <tr>
                <th>Course</th>

                <th>Instructor</th>

                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {lectures.map((lecture) => (
                <tr key={lecture._id}>
                  <td>
                    {lecture.course?.name}
                  </td>

                  <td>
                    {lecture.instructor?.name}
                  </td>

                  <td>
                    {new Date(
                      lecture.lectureDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Lectures;