import User from "../modules/user";
import React, { useState, useEffect } from "react";
import MyProfile from "../components/MyProfile";
import MyReviews from "../components/MyReviews";
import MySettings from "../components/MySettings";

type CurrentPage = "profile" | "reviews" | "settings";

function UserDashboard() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("reviews");

  const userIsAuthenticated = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    if (!userIsAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  const handlePageChange = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-dashboard container">
      {userIsAuthenticated() && (
        <>
          <h1>{User.getName()}'s Dashboard</h1>
          <div className="user-dashboard nav">
            <button
              className={`btn-secondary small ${
                currentPage === "reviews" && "active"
              }`}
              onClick={() => handlePageChange("reviews")}
            >
              My Reviews
            </button>
            <button
              className={`btn-secondary small ${
                currentPage === "profile" && "active"
              }`}
              onClick={() => handlePageChange("profile")}
            >
              Profile
            </button>
            <button
              className={`btn-secondary small ${
                currentPage === "settings" && "active"
              }`}
              onClick={() => handlePageChange("settings")}
            >
              Settings
            </button>
          </div>
          {currentPage === "profile" && <MyProfile />}
          {currentPage === "reviews" && <MyReviews />}
          {currentPage === "settings" && <MySettings />}
        </>
      )}
    </div>
  );
}

export default UserDashboard;
