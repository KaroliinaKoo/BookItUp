import User from "../modules/user";
import { FeedbackContext } from "../context/FeedbackContext";
import { useContext, useState, useEffect } from "react";
import FeedbackItem from "./FeedbackItem";
import { NavLink } from "react-router-dom";

function MyReviews({}) {
  const { feedback, itemIsLoading } = useContext(FeedbackContext);
  const username = User.getName();
  const [MyReviews, setMyReviews] = useState([]);

  useEffect(() => {
    setMyReviews(feedback.filter((item) => item.username === username));
  }, [feedback, username]);

  return (
    <>
      <div className="user-reviews">
        {itemIsLoading && <div className="spinner" role="status" />}
        <div className="feedback-list">
          {MyReviews.length === 0 && (
            <p>You have not written any reviews yet.</p>
          )}
          {MyReviews.map((item) => (
            <FeedbackItem key={item.id} item={item} profileView="true" />
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
