import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

function LinkList({ openClose, userLoggedIn }) {
  return (
    <ul>
      <li>
        <NavLink to="/" onClick={openClose}>
          <FaHome />
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/read-reviews" onClick={openClose}>
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
        {userLoggedIn ? (
          <NavLink
            to="/logout"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Log Out <FaSignOutAlt />
          </NavLink>
        ) : (
          <NavLink to="/login">
            Log In <FaSignInAlt />
          </NavLink>
        )}
      </div>
    </ul>
  );
}

export default LinkList;
