import React from "react";
import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
  const { feedback, itemIsLoading } = useContext(FeedbackContext);

  if (!itemIsLoading && (!feedback || feedback.length === 0)) {
    return <p>No reviews found.</p>;
  }
  return itemIsLoading ? (
    <div className="spinner" role="status" />
  ) : (
    <div className="feedback-list">
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default FeedbackList;
