import React from "react";
import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackList({ search }) {
  const { feedback, itemIsLoading } = useContext(FeedbackContext);

  if (!itemIsLoading && (!feedback || feedback.length === 0)) {
    return <p>No reviews found.</p>;
  }
  return itemIsLoading ? (
    <div className="spinner" role="status" />
  ) : (
    <div className="feedback-list">
      {feedback
        .filter((item) => {
          if (
            search.title === "" &&
            search.author === "" &&
            search.rating === "" &&
            search.username === ""
          ) {
            return item;
          } else if (
            item.title.toLowerCase().includes(search.title.toLowerCase()) &&
            item.author.toLowerCase().includes(search.author.toLowerCase()) &&
            item.rating.toString().includes(search.rating) &&
            item.username.toLowerCase().includes(search.username.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item) => (
          <FeedbackItem key={item.id} item={item} />
        ))}
    </div>
  );
}

export default FeedbackList;
