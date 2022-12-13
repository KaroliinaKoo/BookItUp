import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDataTypes } from "../../context/UserContext";
import Input from "../../components/shared/Input";
import AlertContext from "../../context/AlertContext";

function Register() {
  const navigate = useNavigate();

  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("context not found");
  }

  const { showAlert } = context;

  type FormDataTypes = {
    confirm_password: string;
  } & Partial<UserDataTypes>;

  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
    username: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleInputValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      case "confirm_password":
        if (!value) {
          errorObj.confirm_password = "Confirm password is required";
        } else if (value !== formData.password) {
          errorObj.confirm_password = "Passwords do not match";
        } else {
          errorObj.confirm_password = "";
        }
        break;

      default:
        break;
    }
    setError(errorObj);
  };

  useEffect(() => {
    if (
      !error.email &&
      !error.username &&
      !error.password &&
      !error.confirm_password
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleInputValidation(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid) {
      setFormErrorMessage("Please fill out the form correctly");
      return;
    }
    // register
    fetch("http://localhost:3002/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/auth/login");
        showAlert("success", "Account created successfully");
        return response.json();
      }
      if (response.status === 400) {
        setFormErrorMessage("An account with this e-mail already exists");
        throw new Error("Status Error: " + response.status);
      }
    });
  };

  return (
    <div className="container-card login">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Register</h1>
          <div className="toggle-register-container">
            Already have an account?
            <button
              className="toggle-register btn-link"
              type="button"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="form-body">
          <Input
            autoComplete="on"
            autoFocus
            error={!!error.email}
            errorMsg={error.email}
            label="E-mail"
            maxLength={100}
            name="email"
            onChange={handleChange}
            placeholder="Enter your e-mail"
            required
            type="email"
            value={formData.email}
          />
          <Input
            autoComplete="on"
            error={!!error.username}
            errorMsg={error.username}
            label="Username"
            maxLength={18}
            minLength={3}
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            required
            type="text"
            value={formData.username}
          />
          <Input
            autoComplete="off"
            error={!!error.password}
            errorMsg={error.password}
            label="Password"
            maxLength={32}
            minLength={6}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
            type={showPassword ? "text" : "password"}
            value={formData.password}
          >
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
          </Input>
          <Input
            error={!!error.confirm_password}
            errorMsg={error.confirm_password}
            value={formData.confirm_password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Enter your password again"
            autoComplete="off"
            maxLength={32}
            minLength={6}
            required
            label="Confirm Password"
          >
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
          </Input>
        </div>
        <div className="form-footer">
          <button type="submit" className="btn btn-primary">
            Register
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
export default Register;
