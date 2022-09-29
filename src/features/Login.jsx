import React from "react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import User from "../modules/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!register) {
      return;
    }
    let { name, value } = e.target;
    let errorObj = { ...error };
    switch (name) {
      case "email":
        if (!value) {
          errorObj.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorObj.email = "Email is invalid";
        } else {
          errorObj.email = "";
        }
        break;

      case "username":
        if (!value) {
          errorObj.username = "Username is required";
        } else {
          errorObj.username = "";
        }
        break;

      case "password":
        if (!value) {
          errorObj.password = "Password is required";
        } else if (value.length < 6) {
          errorObj.password = "Password must be at least 6 characters";
        } else {
          errorObj.password = "";
        }
        break;

      case "confirmPassword":
        if (!value) {
          errorObj.confirmPassword = "Confirm password is required";
        } else if (value !== formData.password) {
          errorObj.confirmPassword = "Passwords do not match";
        } else {
          errorObj.confirmPassword = "";
        }
        break;

      default:
        break;
    }
    setError(errorObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (register) {
      // register
      fetch("http://localhost:3002/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((user) => {
          console.log("Registered: " + JSON.stringify(user));
          navigate("/");
        });
    } else {
      // login
      fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((user) => {
          console.log("Logged in :" + JSON.stringify(user));
          user.accessToken && localStorage.setItem("token", user.accessToken);
          user.accessToken &&
            localStorage.setItem("user", JSON.stringify(user.user));
          User.setData(user.user);
          navigate("/");
          window.location.reload();
        });
    }
  };

  return (
    <div className="container-card login">
      <h1>{register ? "Register" : "Login"}</h1>
      {!register && (
        <div className="toggle-register-container">
          No account?
          <button
            className="toggle-register btn-link"
            type="button"
            onClick={() => setRegister(true)}
          >
            Register
          </button>
        </div>
      )}
      {register && (
        <div className="toggle-register-container">
          Already have an account?
          <button
            className="toggle-register btn-link"
            type="button"
            onClick={() => setRegister(false)}
          >
            Sign In
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@yourmail.com"
              autoComplete="on"
              maxLength={100}
              required
              autoFocus
            />
            {register && error.email && <p className="error">{error.email}</p>}
          </div>
          {register && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                value={formData.username}
                onChange={handleChange}
                type="username"
                id="username"
                name="username"
                placeholder="Your username"
                autoComplete="on"
                maxLength={18}
                minLength={3}
                required
              />
              {register && error.username && (
                <p className="error">{error.username}</p>
              )}
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Your password"
              autoComplete="off"
              maxLength={32}
              minLength={8}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {register && error.password && (
              <p className="error">{error.password}</p>
            )}
          </div>

          {register && (
            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirm-password"
                placeholder="Write your password again"
                autoComplete="off"
                maxLength={32}
                minLength={8}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {register && error.confirmPassword && (
                <p className="error">{error.confirmPassword}</p>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            {register ? "Register" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
