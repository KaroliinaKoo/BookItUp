import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

function UserDashboard() {
  const userIsAuthenticated = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    if (!userIsAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="user-dashboard container">
      {userIsAuthenticated() && (
        <>
          <h1>Dashboard</h1>
          <nav className="user-dashboard nav">
            <NavLink to="/dashboard/profile">Profile</NavLink>
            <NavLink to="/dashboard/reviews">Reviews</NavLink>
            <NavLink to="/dashboard/settings">Settings</NavLink>
          </nav>

          <div className="user-dashboard-content">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default UserDashboard;
