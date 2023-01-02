import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="user-dashboard container">
      <h1>Dashboard</h1>
      <nav className="user-dashboard nav">
        <NavLink to="/dashboard/profile">Profile</NavLink>
        <NavLink to="/dashboard/reviews">Reviews</NavLink>
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>

      <div className="user-dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;
