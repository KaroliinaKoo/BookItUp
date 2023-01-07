import React from "react";
import { useState, useEffect } from "react";

type PropTypes = {
  select: (rating: number) => void;
  currentRating?: number;
};

function RatingSelector({ select, currentRating }: PropTypes) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (currentRating) {
      setRating(currentRating);
    }
  }, [currentRating]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRating(Number(e.currentTarget.value));
    select(Number(e.currentTarget.value));
  };

  return (
    <fieldset className="rating-container">
      <legend className="rating-heading">Select a Rating:</legend>
      <span className="detail-text">
        How would you rate the book on a scale of 1 to 10?
      </span>
      <ul className="rating">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num, index) => (
          <li key={index}>
            <button
              aria-label={`${num}`}
              className={rating === num ? "selected" : ""}
              id={`rating-${num}`}
              value={`${num}`}
              onClick={handleClick}
              type="button"
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default RatingSelector;
