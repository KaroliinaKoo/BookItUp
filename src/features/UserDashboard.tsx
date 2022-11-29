import User from "../modules/user";
import React, { useState, useEffect } from "react";
import MyProfile from "../components/MyProfile";
import MyReviews from "../components/MyReviews";
import UserSelectCategories from "../components/UserSelectCategories";

function UserDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [showReviews, setShowReviews] = useState(true);

  const userIsAuthenticated = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    if (!userIsAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowReviews(false);
  };

  const handleReviewsClick = () => {
    setShowProfile(false);
    setShowReviews(true);
  };

  return (
    <div className="user-dashboard container">
      <UserSelectCategories />
      {userIsAuthenticated() && (
        <>
          <h1>{User.getName()}'s Dashboard</h1>
          <div className="user-dashboard nav">
            <button
              className={`btn-secondary small ${showReviews ? "active" : ""}`}
              onClick={handleReviewsClick}
            >
              My Reviews
            </button>
            <button
              className={`btn-secondary small ${showProfile ? "active" : ""}`}
              onClick={handleProfileClick}
            >
              My Profile
            </button>
          </div>
          {showProfile && <MyProfile />}
          {showReviews && <MyReviews />}
        </>
      )}
    </div>
  );
}

export default UserDashboard;
