import User from "../modules/user";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function MyProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    username: User.getName(),
    email: User.getEmail(),
    password: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      username: User.getName(),
      email: User.getEmail(),
      password: "",
      newPassword: "",
    });
    setEditProfile(!editProfile);
  };

  return (
    <div className="user-profile">
      <h2>My Profile</h2>

      {editProfile ? (
        <form className="form-control">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              value={formData.username}
              onChange={handleChange}
              type="username"
              name="username"
              placeholder="Your username"
              maxLength={18}
              minLength={3}
              required
              autoFocus
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Your e-mail"
              maxLength={100}
              required
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
              placeholder="Your current password"
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
        </form>
      ) : (
        <>
          <div className="user-info">
            <div>
              <p>Username:</p>
              <p>{User.getName()}</p>
            </div>
            <div>
              <p>E-mail:</p>
              <p>{User.getEmail()}</p>
            </div>
          </div>
          <div className="btn-container">
            <button
              className="btn-primary small"
              onClick={() => setEditProfile(!editProfile)}
            >
              Edit Profile
            </button>
            <button className="btn-primary small">Change password</button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyProfile;
