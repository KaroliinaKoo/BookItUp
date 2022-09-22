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

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const checkUserLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

console.log("Logged in: " + checkUserLoggedIn());

function LinkList({ openClose, user }) {
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
        <NavLink to="/new-review" onClick={openClose}>
          <FaPlus />
          Add a Review
        </NavLink>
      </li>
      <div className="user-login">
        {checkUserLoggedIn() ? (
          <>
            <div className="user-info">
              <FaUser />
              {user.name}
            </div>
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
          <NavLink to="/login">
            <FaSignInAlt /> Log In
          </NavLink>
        )}
      </div>
    </ul>
  );
}

export default LinkList;
