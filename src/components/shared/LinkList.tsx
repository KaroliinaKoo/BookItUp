import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPlus,
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
  const { user, userLogOut } = context;

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
                userLogOut();
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
