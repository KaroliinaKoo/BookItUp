import React from "react";
import { useState, useEffect, useContext } from "react";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { subjectHeadingsList } from "../data/subjectHeadingsList";
import { UserDataTypes } from "../context/UserContext";
import UserContext from "../context/UserContext";

function Login() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext not found");
  }

  const { setUserData, user } = context;

  const navigate = useNavigate();
  const [formData, setFormData]: [Partial<UserDataTypes>, any] = useState({
    email: "",
    password: "",
    username: "",
    categories: [],
  });

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  useEffect(() => {
    user.id !== 0 && navigate("/");
  }, []);

  useEffect(() => {
    setFormErrorMessage("");
  }, [showRegisterPage, error]);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showRegisterPage) {
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
    if (showRegisterPage) {
      if (passwordConfirmation === formData.password) {
        setError({ ...error, password_confirmation: "" });
      } else {
        setError({ ...error, password_confirmation: "Passwords do not match" });
      }
    }
  }, [passwordConfirmation, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleValidation(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showRegisterPage) {
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
        .then(() => {
          setShowRegisterPage(false);
          formData.password = "";
          setShowPassword(false);
        });
    }
    if (!showRegisterPage) {
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
        .then((userData) => {
          console.log(userData);
          userData.accessToken &&
            localStorage.setItem("token", userData.accessToken);
          userData.accessToken &&
            localStorage.setItem("user", JSON.stringify(userData.user));
          setUserData(userData.user);
          navigate("/");
          window.location.reload();
        });
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
    handleValidation(e);
  };

  useEffect(() => {
    if (showRegisterPage) {
      setFormIsValid(Object.values(error).every((err) => err === ""));
    }
  }, [error, showRegisterPage]);

  return (
    <div className="container-card login">
      <h1>{showRegisterPage ? "Register" : "Login"}</h1>
      {!showRegisterPage && (
        <div className="toggle-register-container">
          No account?
          <button
            className="toggle-register btn-link"
            type="button"
            onClick={() => setShowRegisterPage(true)}
          >
            Register
          </button>
        </div>
      )}
      {showRegisterPage && (
        <div className="toggle-register-container">
          Already have an account?
          <button
            className="toggle-register btn-link"
            type="button"
            onClick={() => setShowRegisterPage(false)}
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
              className={showRegisterPage && error.email ? "error" : ""}
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your e-mail"
              autoComplete="on"
              maxLength={100}
              required
              autoFocus
            />
            {showRegisterPage && error.email && (
              <p className="error">{error.email}</p>
            )}
          </div>
          {showRegisterPage && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                className={error.username && "error"}
                value={formData.username}
                onChange={handleChange}
                type="username"
                id="username"
                name="username"
                placeholder="Enter your username"
                autoComplete="on"
                maxLength={18}
                minLength={3}
                required
              />
              {showRegisterPage && error.username && (
                <p className="error">{error.username}</p>
              )}
            </div>
          )}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              className={showRegisterPage && error.password ? "error" : ""}
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              maxLength={32}
              minLength={6}
              required
            />
            {showRegisterPage && error.password && (
              <p className="error">{error.password}</p>
            )}
            <button
              aria-label="Toggle password visibility"
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash aria-label="hide" />
              ) : (
                <FaEye aria-label="show" />
              )}
            </button>
          </div>

          {showRegisterPage && (
            <>
              <div className="input-group">
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                  className={error.password_confirmation && "error"}
                  value={passwordConfirmation}
                  onChange={handleConfirmPassword}
                  type={showPassword ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Enter your password again"
                  autoComplete="off"
                  maxLength={32}
                  minLength={6}
                  required
                />
                <button
                  aria-label="Toggle password visibility"
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash aria-label="hide" />
                  ) : (
                    <FaEye aria-label="show" />
                  )}
                </button>
                {showRegisterPage && error.password_confirmation && (
                  <p className="error">{error.password_confirmation}</p>
                )}
              </div>
              <div className="user-select-categories">
                <p>Choose the categories you are interested in</p>
                <div className="user-select-categories__list">
                  {subjectHeadingsList.map((category) => (
                    <div
                      className="input-group radio-input user-select-categories__list__item"
                      key={category}
                    >
                      <input
                        type="checkbox"
                        id={category}
                        name={category}
                        value={category}
                        checked={formData.categories?.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              categories: [
                                ...formData.categories!,
                                e.target.value,
                              ],
                            });
                          } else {
                            setFormData({
                              ...formData,

                              categories: formData.categories!.filter(
                                (category) => category !== e.target.value
                              ),
                            });
                          }
                        }}
                      />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary">
            {showRegisterPage ? "Register" : "Sign In"}
          </button>
        </div>
        {formErrorMessage !== "" && (
          <p className="error form-error">
            <FaExclamationCircle />
            {formErrorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
export default Login;
