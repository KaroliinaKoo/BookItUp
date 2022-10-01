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
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [register, setRegister] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setFormErrorMessage("");
  }, [register, error]);

  const handleValidation = (e) => {
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
        } else if (value.length < 3) {
          errorObj.username = "Username must be at least 3 characters";
        } else if (value.length > 18) {
          errorObj.username = "Username must be less than 18 characters";
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

      default:
        break;
    }
    setError(errorObj);
  };

  useEffect(() => {
    if (register) {
      if (passwordConfirmation === formData.password) {
        setError({ ...error, password_confirmation: "" });
      } else {
        setError({ ...error, password_confirmation: "Passwords do not match" });
      }
    }
  }, [passwordConfirmation, formData.password]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleValidation(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (register) {
      if (!formIsValid) {
        setFormErrorMessage("Please fill out the form correctly");
        return;
      }
      setFormErrorMessage("");
      // register
      fetch("http://localhost:3002/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else if (response.status === 400) {
            setFormErrorMessage("An account with this e-mail already exists");
            throw new Error("Status Error: " + response.status);
          }
        })
        .then((user) => {
          console.log(user);
          setRegister(false);
          formData.password = "";
          setShowPassword(false);
        });
    }
    if (!register) {
      // login
      fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            setFormErrorMessage(
              "E-mail or password is incorrect, or the account does not exist"
            );
            throw new Error("Status Error: " + response.status);
          }
        })
        .then((user) => {
          user.accessToken && localStorage.setItem("token", user.accessToken);
          user.accessToken &&
            localStorage.setItem("user", JSON.stringify(user.user));
          User.setData(user.user);
          navigate("/");
          window.location.reload();
        });
    }
  };

  const handleConfirmPassword = (e) => {
    setPasswordConfirmation(e.target.value);
    handleValidation(e);
  };

  useEffect(() => {
    if (register) {
      setFormIsValid(Object.values(error).every((err) => err === ""));
    }
  }, [error, register]);

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
              className={register && error.email ? "error" : ""}
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
                className={error.username && "error"}
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
              className={register && error.password ? "error" : ""}
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Your password"
              autoComplete="off"
              maxLength={32}
              minLength={6}
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
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                className={error.password_confirmation && "error"}
                value={passwordConfirmation}
                onChange={handleConfirmPassword}
                type={showPassword ? "text" : "password"}
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Write your password again"
                autoComplete="off"
                maxLength={32}
                minLength={6}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {register && error.password_confirmation && (
                <p className="error">{error.password_confirmation}</p>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            {register ? "Register" : "Sign In"}
          </button>
        </div>
        {formErrorMessage !== "" && (
          <p className="error form-error">{formErrorMessage}</p>
        )}
      </form>
    </div>
  );
}
export default Login;
