import React from "react";
import { NavLink } from "react-router-dom";

function Main() {
  return (
    <>
      <div className="hero-container">
        <div className="hero-card">
          <p>The Best Reads</p> <p>Wherever you are.</p>
          <NavLink to="/log-in">
            <button className="btn btn-cta">Sign Up Today</button>
          </NavLink>
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
