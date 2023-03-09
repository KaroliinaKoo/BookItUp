import React, { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserDataTypes } from "../../context/UserContext";
import AlertContext from "../../context/AlertContext";

type Props = {
  user: UserDataTypes;
};

interface FormData {
  value: string;
  error: string;
}

function MyProfile({ user }: Props) {
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const alertContext = useContext(AlertContext);
  if (!alertContext) throw new Error("context not found");
  const { showAlert } = alertContext;

  const [formData, setFormData] = useState<Record<string, FormData>>({
    newPassword: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  });

  useEffect(() => {
    if (
      formData.newPassword.value &&
      formData.confirmPassword.value &&
      !formData.newPassword.error &&
      !formData.confirmPassword.error
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [formData]);

  const handlePasswordLength = (password: string) =>
    password.length < 6 ? "Password must be at least 6 characters" : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = name === "newPassword" ? handlePasswordLength(value) : "";
    const confirmPasswordError =
      name === "confirmPassword" && value !== formData.newPassword.value
        ? "Passwords do not match"
        : "";

    setFormData({
      ...formData,
      [name]: { value, error: error || confirmPasswordError },
    });
  };

  const handleReset = () => {
    setFormData({
      newPassword: { value: "", error: "" },
      confirmPassword: { value: "", error: "" },
    });
    setShowPassword(false);
    setChangePassword(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formIsValid) {
      setFormIsValid(false);
      return showAlert("error", "Please fill out the form correctly");
    }

    try {
      const response = await fetch(`http://localhost:3002/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.newPassword.value }),
      });

      if (!response.ok) throw new Error(`Status Error: ${response.status}`);
      setFormData({
        newPassword: { value: "", error: "" },
        confirmPassword: { value: "", error: "" },
      });
      setShowPassword(false);
      setChangePassword(false);
      showAlert("success", "Password changed successfully");
    } catch (error) {
      showAlert("error", "Something went wrong");
    }
  };

  return (
    <div className="user-profile">
      {changePassword ? (
        <form className="form-control" onSubmit={handleSubmit}>
          <h3>Change Password</h3>
          <div className="button-container">
            <button
              aria-label="Toggle password visibility"
              type="button"
              className="btn-neutral small"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide all passwords" : "Show all passwords"}
              {showPassword ? (
                <FaEyeSlash aria-label="hide" />
              ) : (
                <FaEye aria-label="show" />
              )}
            </button>
          </div>
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              className={formData.newPassword.error && "error"}
              value={formData.newPassword.value}
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
            {formData.newPassword.error && (
              <p className="error">{formData.newPassword.error}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              className={formData.confirmPassword.error && "error"}
              value={formData.confirmPassword.value}
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
            {formData.confirmPassword.error && (
              <p className="error">{formData.confirmPassword.error}</p>
            )}
          </div>

          <div className="btn-container">
            <button
              className="btn-secondary small outlined"
              type="button"
              onClick={() => handleReset()}
            >
              Cancel
            </button>
            <button
              className="btn-primary small"
              type="submit"
              disabled={!formIsValid}
            >
              Confirm Changes
            </button>
          </div>
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
