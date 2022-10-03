import React from "react";
import { NavLink } from "react-router-dom";
import User from "../modules/user";

function Main() {
  return (
    <div className="hero-container">
      <div className="hero-card">
        <p>The Best Reads</p> <p>Wherever you are.</p>
        {User?.isAuthorized() ? (
          <div className="user-welcome">Hi, {User?.getName()}</div>
        ) : (
          <NavLink to="/login" className="btn-primary btn-cta">
            Sign Up Today
          </NavLink>
        )}
        <div className="credit">
          <a href="https://unsplash.com/@patriotbarrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Photo by Dan Dumitriu
          </a>
        </div>
      </div>
    </div>
  );
}

export default Main;
