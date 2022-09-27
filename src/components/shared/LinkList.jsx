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

function LinkList({ openClose, user, handleLogout }) {
  const checkUserLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };

  return (
    <ul>
      <li>
        <NavLink to="/" onClick={openClose}>
          <FaHome />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/find-reviews" onClick={openClose}>
          <FaSearch />
          Find Reviews
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-review" onClick={openClose}>
          <FaPlus />
          Add a Review
        </NavLink>
      </li>
      <div className="user-login">
        {checkUserLoggedIn() ? (
          <>
            <NavLink to="/dashboard" onClick={openClose} className="user-info">
              <FaUser />
              {user.username}
            </NavLink>
            <NavLink
              to="/logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <FaSignOutAlt /> Log Out
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" onClick={openClose}>
            <FaSignInAlt /> Log In
          </NavLink>
        )}
      </div>
    </ul>
  );
}

export default LinkList;
