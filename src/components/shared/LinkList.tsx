import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import UserContext from "../../context/UserContext";

type PropTypes = {
  openClose: () => void;
};

function LinkList({ openClose }: PropTypes) {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  const { user, clearUserData } = context;

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
        <NavLink to="/find-books" onClick={openClose} className="mobile-btn">
          <FaSearch />
          Find Books
        </NavLink>
      </li>
      {userIsLoggedIn() ? (
        <>
          <li>
            <NavLink
              to="/dashboard/profile"
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
                localStorage.clear();
                clearUserData();
                window.location.href = "/";
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
