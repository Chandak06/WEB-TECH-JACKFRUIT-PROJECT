import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // demo: after "login" redirect to home
    navigate("/");
  };

  return (
    <div className="login-box">
      <div className="login-container">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input required placeholder="Email" type="email" />
          <input required placeholder="Password" type="password" />

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Log in
            </button>
          </div>
        </form>

        <p className="small-note">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
