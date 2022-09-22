import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import User from "../modules/user";

function Main() {
  const [user, setUser] = useState(User.getData());

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      User.setData(userData);
      setUser(User.getData());
    }
  }, []);

  return (
    <>
      <div className="hero-container">
        <div className="hero-card">
          <p>The Best Reads</p> <p>Wherever you are.</p>
          {User.isAuthorized() ? (
            <div className="user-welcome">Hi, {user.name}</div>
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
