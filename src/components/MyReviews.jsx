import User from "../modules/user";
import FeedbackContext from "../context/FeedbackContext";
import { useContext, useState } from "react";
import MyReviewItem from "./MyReviewItem";
import ReviewForm from "./ReviewForm";

function MyReviews() {
  const { feedback, itemIsLoading } = useContext(FeedbackContext);
  const username = User.getName();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      <h1>My Reviews</h1>
      {itemIsLoading && <div className="spinner" role="status" />}

      <div className="feedback-list">
        {feedback
          .filter((item) => {
            return item.username === username;
          })
          .map((item) => (
            <MyReviewItem
              key={item.id}
              item={item}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          ))}

        {showForm && <ReviewForm />}
      </div>
    </div>
  );
}

export default MyReviews;
