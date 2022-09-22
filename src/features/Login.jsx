import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import User from "../modules/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          console.log("Registered: " + user);
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
          console.log("Logged in :" + user);
          user.accessToken && localStorage.setItem("token", user.accessToken);
          User.setData(user);
          navigate("/");
          window.location.reload();
        });
    }
  };

  return (
    <div className="container">
      <div className="card login">
        <h1>{register ? "Register" : "Login"}</h1>
        {!register && (
          <div className="toggle-register-container">
            No account?
            <button
              className="toggle-register"
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
              className="toggle-register"
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
            </div>

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
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              {register ? "Register" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
