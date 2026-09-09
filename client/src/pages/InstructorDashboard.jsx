import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

const InstructorDashboard = () => {
  const [lectures, setLectures] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const loadLectures = async () => {
      try {
        const response =
          await API.get(
            "/lectures/my-lectures"
          );

        setLectures(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadLectures();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>
          Welcome, {user?.name} 👋
        </h1>

        <p>
          Here are your scheduled lectures.
        </p>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Course</th>

                <th>Level</th>

                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {lectures.length === 0 ? (
                <tr>
                  <td colSpan="3">
                    No lectures assigned yet.
                  </td>
                </tr>
              ) : (
                lectures.map((lecture) => (
                  <tr key={lecture._id}>
                    <td>
                      {lecture.course?.name}
                    </td>

                    <td>
                      {lecture.course?.level}
                    </td>

                    <td>
                      {new Date(
                        lecture.lectureDate
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default InstructorDashboard;