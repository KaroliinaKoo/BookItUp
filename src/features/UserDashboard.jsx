import User from "../modules/user";
import { useState, useEffect } from "react";
import MyProfile from "../components/MyProfile";
import MyReviews from "../components/MyReviews";

function UserDashboard() {
  const [showProfile, setShowProfile] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

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
      {userIsAuthenticated() && (
        <>
          <h1>{User.getName()}'s Dashboard</h1>
          <div className="user-dashboard nav">
            <button
              className={`btn-secondary small ${showProfile ? "active" : ""}`}
              onClick={handleProfileClick}
            >
              Profile
            </button>
            <button
              className={`btn-secondary small ${showReviews ? "active" : ""}`}
              onClick={handleReviewsClick}
            >
              Reviews
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
