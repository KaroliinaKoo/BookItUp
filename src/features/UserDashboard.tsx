import React, { useState, useEffect, useContext } from "react";
import MyProfile from "../components/MyProfile";
import MyReviews from "../components/MyReviews";
import MySettings from "../components/MySettings";
import UserContext from "../context/UserContext";

type CurrentPage = "profile" | "reviews" | "settings";

function UserDashboard() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext not found");
  }

  const { user } = context;

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
          <h1>{user.username}'s Dashboard</h1>
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
          {currentPage === "profile" && <MyProfile user={user} />}
          {currentPage === "reviews" && <MyReviews user={user} />}
          {currentPage === "settings" && <MySettings />}
        </>
      )}
    </div>
  );
}

export default UserDashboard;
