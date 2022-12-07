import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
import { UserDataTypes } from "../context/UserContext";

type Props = {
  user: UserDataTypes;
};

function MyProfile({ user }: Props) {
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormErrorMessage("");
    setFormIsValid(Object.values(error).every((err) => err === ""));
  }, [error]);

  useEffect(() => {
    if (formData.confirmPassword !== formData.newPassword) {
      setError({ ...error, confirmPassword: "Passwords do not match" });
    } else {
      setError({ ...error, confirmPassword: "" });
    }
  }, [formData]);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    let errorObj = { ...error };
    switch (name) {
      case "currentPassword":
        if (!value) {
          errorObj.currentPassword = "Current password is required";
        } else {
          errorObj.currentPassword = "";
        }
        break;

      case "newPassword":
        if (!value) {
          errorObj.newPassword = "New password is required";
        } else if (value.length < 6) {
          errorObj.newPassword = "Password must be at least 6 characters";
        } else {
          errorObj.newPassword = "";
        }
        break;

      case "confirmPassword":
        if (!value) {
          errorObj.confirmPassword = "Confirm password is required";
        }
        break;

      default:
        break;
    }
    setError(errorObj);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    handleValidation(e);
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setChangePassword(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formIsValid) {
      setFormErrorMessage("Please fill out the form correctly");
      return;
    }
    setFormErrorMessage("");

    let param = {
      password: formData.newPassword,
    };

    fetch(`http://localhost:3002/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Status Error: " + response.status);
        }
      })
      .then((data) => {
        console.log("Password changed successfully");
        console.log(data);
        handleReset();
      });
  };

  return (
    <div className="user-profile">
      {changePassword ? (
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              className={error.currentPassword && "error"}
              value={formData.currentPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              placeholder="Enter your current password"
              autoComplete="off"
              maxLength={32}
              minLength={6}
              required
            />
            {error.currentPassword && (
              <p className="error">{error.currentPassword}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              className={error.newPassword && "error"}
              value={formData.newPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              autoComplete="off"
              maxLength={32}
              minLength={6}
              required
            />
            {error.newPassword && <p className="error">{error.newPassword}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              className={error.confirmPassword && "error"}
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter your new password again"
              autoComplete="off"
              maxLength={32}
              minLength={6}
              required
            />
            {error.confirmPassword && (
              <p className="error">{error.confirmPassword}</p>
            )}
          </div>
          <button
            aria-label="Toggle password visibility"
            type="button"
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide all passwords" : "Show all passwords"}
            {showPassword ? (
              <FaEyeSlash aria-label="hide" />
            ) : (
              <FaEye aria-label="show" />
            )}
          </button>
          <div className="btn-container">
            <button
              className="btn-secondary small"
              type="button"
              onClick={() => handleReset()}
            >
              Cancel
            </button>
            <button className="btn-primary small" type="submit">
              Confirm Changes
            </button>
          </div>
          {formErrorMessage && <p className="error">{formErrorMessage}</p>}
        </form>
      ) : (
        <>
          <div className="user-info">
            <div>
              <p>Username:</p>
              <p>{user.username}</p>
            </div>
            <div>
              <p>E-mail:</p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="btn-container">
            <button
              className="btn-primary small"
              onClick={() => setChangePassword(true)}
            >
              Change password
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyProfile;
