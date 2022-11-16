import User from "../modules/user";
import { FeedbackContext } from "../context/FeedbackContext";
import { useContext, useState, useEffect } from "react";
import FeedbackItem from "./FeedbackItem";
import { FeedbackTypes } from "../queries/DataTypes";
import { NavLink } from "react-router-dom";
import React from "react";

function MyReviews() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("Context not found");
  }
  const { feedback, itemIsLoading } = context;
  const username = User.getName();
  const [myReviews, setMyReviews] = useState<FeedbackTypes[]>([]);

  useEffect(() => {
    if (feedback) {
      const reviews = feedback.filter((item) => item.username === username);
      setMyReviews(reviews);
    }
  }, [feedback, username]);

  return (
    <>
      <div className="user-reviews">
        {itemIsLoading && <div className="spinner" role="status" />}
        <div className="feedback-list">
          {myReviews.length === 0 && (
            <p>You have not written any reviews yet.</p>
          )}

          {myReviews.length > 0 &&
            myReviews.map((item) => (
              <FeedbackItem key={item.id} item={item} profileView={true} />
            ))}
        </div>
      </div>
      <NavLink to="/add-review" className="btn-primary small">
        Add a Review
      </NavLink>
    </>
  );
}

export default MyReviews;
