import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

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
          <NavLink to="/logout">
            <FaSignOutAlt />
            Log Out
          </NavLink>
        ) : (
          <NavLink to="/login">
            <FaSignInAlt />
            Log In
          </NavLink>
        )}
      </div>
    </ul>
  );
}

export default LinkList;
