import User from "../modules/user";
import FeedbackContext from "../context/FeedbackContext";
import { useContext, useState, useEffect } from "react";
import MyReviewItem from "./MyReviewItem";
import ReviewForm from "./ReviewForm";

function MyReviews() {
  const { feedback, itemIsLoading, itemIsEditing } =
    useContext(FeedbackContext);
  const username = User.getName();
  const [showForm, setShowForm] = useState(false);
  const [MyReviews, setMyReviews] = useState([]);

  useEffect(() => {
    setMyReviews(feedback.filter((item) => item.username === username));
  }, [feedback, username]);

  useEffect(() => {
    if (itemIsEditing.isEditing) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [itemIsEditing]);

  return (
    <div className="container">
      <h2>My Reviews</h2>
      {itemIsLoading && <div className="spinner" role="status" />}

      <div className="feedback-list">
        {MyReviews.length === 0 && <p>No reviews yet</p>}

        {MyReviews.map((item) => (
          <MyReviewItem key={item.id} item={item} />
        ))}
        {showForm && <ReviewForm />}
      </div>
    </div>
  );
}

export default MyReviews;
