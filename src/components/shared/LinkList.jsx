import React from "react";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaHome, FaPlus, FaSearch } from "react-icons/fa";

function LinkList({ openClose }) {
  return (
    <ul>
      <li>
        <NavLink to="/" onClick={openClose}>
          <FaHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/new-review" onClick={openClose}>
          <FaPlus />
          Add a Review
        </NavLink>
      </li>
      <li>
        <NavLink to="/read-reviews" onClick={openClose}>
          <FaSearch />
          Find Reviews
        </NavLink>
      </li>
      <li>
        <NavLink to="/log-in" onClick={openClose}>
          <FaSignInAlt />
          Sign In
        </NavLink>
      </li>
    </ul>
  );
}

export default LinkList;
