import React from "react";
import { NavLink } from "react-router-dom";
import User from "../modules/user";
import Recommendations from "../components/Recommendations";

function Main() {
  return (
    <div className="main-container">
      <div className="hero-card">
        <p>The Best Reads</p> <p>Wherever you are.</p>
        {User?.isAuthorized() ? (
          <div className="user-welcome">Hi, {User?.getName()}</div>
        ) : (
          <NavLink to="/login" className="btn-primary btn-cta">
            Sign Up Today
          </NavLink>
        )}
        <a
          className="credit"
          href="https://unsplash.com/@patriotbarrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Photo by Dan Dumitriu
        </a>
      </div>
      <Recommendations />
    </div>
  );
}

export default Main;
