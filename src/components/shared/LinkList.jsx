import React from "react";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaHome, FaPlus } from "react-icons/fa";

function LinkList() {
  return (
    <ul>
      <li>
        <NavLink to="/">
          <FaHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/review">
          <FaPlus />
          Review a Book
        </NavLink>
      </li>
      <li>
        <NavLink to="/log-in">
          <FaSignInAlt />
          Sign In
        </NavLink>
      </li>
    </ul>
  );
}

export default LinkList;
