import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";

import Courses from "./pages/Courses";

import Instructors from "./pages/Instructors";

import Lectures from "./pages/Lectures";

import InstructorDashboard from "./pages/InstructorDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute role="admin">
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructors"
          element={
            <ProtectedRoute role="admin">
              <Instructors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lectures"
          element={
            <ProtectedRoute role="admin">
              <Lectures />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute role="instructor">
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;