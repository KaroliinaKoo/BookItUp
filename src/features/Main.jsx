import React from "react";
import { NavLink } from "react-router-dom";

function Main({ userLoggedIn, username }) {
  return (
    <>
      <div className="hero-container">
        <div className="hero-card">
          <p>The Best Reads</p> <p>Wherever you are.</p>
          {userLoggedIn ? (
            <div className="user-welcome">Hi, {username}</div>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-cta">Sign Up Today</button>
            </NavLink>
          )}
          <div className="credit">
            <a href="https://unsplash.com/@patriotbarrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Photo by Dan Dumitriu
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
