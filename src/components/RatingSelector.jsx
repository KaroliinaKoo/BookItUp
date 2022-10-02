import React from "react";
import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

function RatingSelector({ select }) {
  const { itemIsEditing } = useContext(FeedbackContext);

  const [rating, setRating] = useState({ select });

  useEffect(() => {
    if (itemIsEditing.isEditing) {
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const handleClick = (e) => {
    setRating(+e.target.value); // +e.target.value converts the value of the selected rating button to a number
    select(+e.target.value); // pass the selected rating to the parent component
  };

  return (
    <section className="rating-container">
      <p className="rating-heading">Select a Rating:</p>
      <span className="detail-text">
        How would you rate the book on a scale of 1 to 10?
      </span>
      <ul className="rating">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(
          (
            num,
            index // create an array of numbers from 1 to 10 and map each item in the array to form a list of rating buttons
          ) => (
            <li key={index}>
              <button
                className={rating === num ? "selected" : ""}
                id={`rating-${num}`}
                value={`${num}`}
                onClick={handleClick}
                type="button"
              >
                {num}
              </button>
            </li>
          )
        )}
      </ul>
    </section>
  );
}

export default RatingSelector;
