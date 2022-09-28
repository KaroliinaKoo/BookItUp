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
      {checkUserLoggedIn() ? (
        <>
          <li>
            <NavLink to="/profile" onClick={openClose} className="user-info">
              <FaUser />
              {user.username}
            </NavLink>
          </li>
          <li>
            <NavLink
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
          <NavLink to="/login" onClick={openClose}>
            <FaSignInAlt />
            Login
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default LinkList;
