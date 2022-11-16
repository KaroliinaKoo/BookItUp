import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";

import { UserDataTypes } from "../../queries/DataTypes";

type PropTypes = {
  openClose: () => void;
  user: UserDataTypes | null;
  handleLogout: () => void;
};

function LinkList({ openClose, user, handleLogout }: PropTypes) {
  const userIsLoggedIn = () => {
    return localStorage.getItem("token");
  };

  return (
    <ul>
      <li>
        <NavLink to="/" onClick={openClose} className="mobile-btn">
          <FaHome />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/find-reviews" onClick={openClose} className="mobile-btn">
          <FaSearch />
          Find Reviews
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-review" onClick={openClose} className="mobile-btn">
          <FaPlus />
          Add a Review
        </NavLink>
      </li>
      {userIsLoggedIn() ? (
        <>
          <li>
            <NavLink
              to="/dashboard"
              onClick={openClose}
              className="mobile-btn user-info"
            >
              <FaUser />
              {user?.username}
            </NavLink>
          </li>
          <li>
            <NavLink
              className="mobile-btn"
              to="/logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <FaSignOutAlt />
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/login" onClick={openClose} className="mobile-btn">
            <FaSignInAlt />
            Login
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default LinkList;
