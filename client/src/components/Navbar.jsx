import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/admin" className="logo">
        Lecture Scheduler
      </Link>

      {user?.role === "admin" && (
        <div className="nav-links">
          <Link to="/admin">Dashboard</Link>

          <Link to="/courses">
            Courses
          </Link>

          <Link to="/instructors">
            Instructors
          </Link>

          <Link to="/lectures">
            Lectures
          </Link>
        </div>
      )}

      <div className="user-section">
        <span>{user?.name}</span>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;