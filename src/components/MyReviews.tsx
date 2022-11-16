import User from "../modules/user";
import { DataContext } from "../context/DataContext";
import { useContext, useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import { ReviewDataTypes } from "../queries/DataTypes";
import { NavLink } from "react-router-dom";
import React from "react";

function MyReviews() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Context not found");
  }
  const { itemData, itemIsLoading } = context;
  const username = User.getName();
  const [myReviews, setMyReviews] = useState<ReviewDataTypes[]>([]);

  useEffect(() => {
    if (itemData) {
      const reviews = itemData.filter((item) => item.username === username);
      setMyReviews(reviews);
    }
  }, [itemData, username]);

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
