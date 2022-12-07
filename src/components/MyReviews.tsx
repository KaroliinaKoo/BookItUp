import ReviewContext, { ReviewDataTypes } from "../context/ReviewContext";
import { useContext, useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import { NavLink } from "react-router-dom";
import React from "react";
import { UserDataTypes } from "../context/UserContext";

type Props = {
  user: UserDataTypes;
};

function MyReviews({ user }: Props) {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error("Context not found");
  }
  const { reviewData, itemIsLoading } = context;

  const [myReviews, setMyReviews] = useState<ReviewDataTypes[]>([]);

  useEffect(() => {
    if (reviewData) {
      const reviews = reviewData.filter(
        (item) => item.username === user.username
      );
      setMyReviews(reviews);
    }
  }, [reviewData]);

  return (
    <>
      <div className="user-reviews">
        {itemIsLoading && <div className="spinner" role="status" />}
        <div className="review-list">
          {myReviews.length === 0 && (
            <p>You have not written any reviews yet.</p>
          )}

          {myReviews.length > 0 &&
            myReviews.map((item) => (
              <ReviewItem key={item.id} item={item} profileView={true} />
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
