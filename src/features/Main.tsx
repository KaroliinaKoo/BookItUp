import React from "react";
import { NavLink } from "react-router-dom";
import Recommendations from "../components/Recommendations";
import { UserDataTypes } from "../context/UserContext";

type Props = {
  user: UserDataTypes;
};

function Main({ user }: Props) {
  return (
    <div className="main-container">
      {user.id === 0 ? (
        <div className="hero-card">
          <p>The Best Reads</p> <p>Wherever you are.</p>
          <NavLink to="/login" className="btn-primary btn-cta">
            Sign Up Today
          </NavLink>
          <a
            className="credit"
            href="https://unsplash.com/@patriotbarrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Photo by Dan Dumitriu
          </a>
        </div>
      ) : (
        <div className="user-greet-container">
          <div className="user-welcome">Hi, {user.username}!</div>
          <Recommendations />
        </div>
      )}
    </div>
  );
}

export default Main;
