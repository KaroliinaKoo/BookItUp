import React from "react";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

  let average =
    feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;
  // sum of all ratings / number of ratings = average rating of all feedback items
  average = Math.round(average * 10) / 10; // round to 1 decimal place

  return (
    <div className="feedback-stats">
      <p>{feedback.length} Reviews </p>
      <p>Average Rating: {isNaN(average) ? 0 : average}</p>
    </div>
  );
}

export default FeedbackStats;
