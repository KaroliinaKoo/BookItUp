import User from "../modules/user";
import { useState } from "react";

function MyProfile() {
  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <div className="user-profile">
      <h2>My Profile</h2>

      {editProfile ? (
        <div>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
            <button type="submit">Save</button>
            <button type="reset" onClick={() => handleEditProfile()}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Username: {User.getName()}</p>
          <p>E-mail: {User.getEmail()}</p>
        </div>
      )}

      <div className="btn-container">
        <button onClick={() => handleEditProfile()}>Edit</button>
        <button>Change password</button>
      </div>
    </div>
  );
}

export default MyProfile;
