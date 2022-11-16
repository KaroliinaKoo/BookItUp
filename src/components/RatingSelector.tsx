import React from "react";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";

type PropTypes = {
  select: (rating: number) => void;
};

function RatingSelector({ select }: PropTypes) {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Context not found");
  }

  const { itemIsEditing } = context;

  const [rating, setRating]: [number, any] = useState(0);

  useEffect(() => {
    if (itemIsEditing.isEditing && itemIsEditing.item) {
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRating(Number(e.currentTarget.value));
    select(Number(e.currentTarget.value));
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
