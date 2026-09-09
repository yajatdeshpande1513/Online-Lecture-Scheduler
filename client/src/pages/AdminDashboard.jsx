import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    instructors: 0,
    lectures: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          courses,
          instructors,
          lectures,
        ] = await Promise.all([
          API.get("/courses"),
          API.get("/instructors"),
          API.get("/lectures"),
        ]);

        setStats({
          courses: courses.data.length,
          instructors:
            instructors.data.length,
          lectures:
            lectures.data.length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Admin Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Courses</h3>

            <h2>{stats.courses}</h2>
          </div>

          <div className="stat-card">
            <h3>Total Instructors</h3>

            <h2>{stats.instructors}</h2>
          </div>

          <div className="stat-card">
            <h3>Total Lectures</h3>

            <h2>{stats.lectures}</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;