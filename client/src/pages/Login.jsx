import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (
        response.data.user.role === "admin"
      ) {
        navigate("/admin");
      } else {
        navigate("/instructor");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Lecture Scheduler</h1>

        <p>
          Manage courses and lectures efficiently
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials</h3>

          <p>
            <b>Admin:</b>
            <br />
            admin@lecture.com
            <br />
            Admin@123
          </p>

          <p>
            <b>Instructor:</b>
            <br />
            rahul@lecture.com
            <br />
            Instructor@123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;