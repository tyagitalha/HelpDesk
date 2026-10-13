import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://helpdesk-3b70.onrender.com/api/v1/users/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          navigate("/register");
          console.error("not work");
        }
        alert("email & password are wrong ")
        return; 
      }
      console.log("role", data.data.user.role);

      console.log("login success", data);

      if (data.data.user.role === "Admin") {
        navigate("/adminDashboard");
      } else if (data.data.user.role === "user") {
        navigate("/userDashboard");
      }
    } catch (error) {
      console.error("netwotk", error);

      alert("Server is not reachable");
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <Link to="/" className="login-brand">
            Resolve<span>X</span>
          </Link>

          <h1>Welcome Back</h1>
          <p>Login to manage your support tickets.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login to ResolveX
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
