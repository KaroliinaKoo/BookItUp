import React from "react";
import { useState, useContext } from "react";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDataTypes } from "../../context/UserContext";
import UserContext from "../../context/UserContext";
import Input from "../../components/shared/Input";

function LogIn() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext not found");
  }

  const { setUserData } = context;

  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<UserDataTypes>>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  return (
    <div className="container-card login">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Login</h1>
          <div className="toggle-register-container">
            No account?
            <button
              className="toggle-register btn-link"
              type="button"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </button>
          </div>
        </div>

        <div className="form-body">
          <Input
            autoComplete="on"
            autoFocus
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
            autoComplete="off"
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
        </div>
        <div className="form-footer">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>

          {formErrorMessage !== "" && (
            <p className="error form-error">
              <FaExclamationCircle />
              {formErrorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
export default LogIn;
