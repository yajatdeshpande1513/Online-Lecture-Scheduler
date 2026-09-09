import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

const Instructors = () => {
  const [instructors, setInstructors] =
    useState([]);

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const response =
          await API.get("/instructors");

        setInstructors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadInstructors();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Instructors</h1>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Name</th>

                <th>Email</th>

                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {instructors.map(
                (instructor) => (
                  <tr key={instructor._id}>
                    <td>
                      {instructor.name}
                    </td>

                    <td>
                      {instructor.email}
                    </td>

                    <td>
                      Instructor
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Instructors;