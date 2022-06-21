import React from "react";
import { useState } from "react";

function RatingSelector({ select }) {
  const [rating, setRating] = useState({ select });
  const handleChange = (e) => {
    if (select === undefined) {
      setRating(undefined);
    }
    setRating(+e.target.value); // +e.target.value converts the value of the selected radio button to a number
    select(+e.target.value); // pass the selected rating to the parent component
  };

  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => i + 1).map(
        (
          num,
          index // create an array of numbers from 1 to 10 and map each item in the array to form a list of radio buttons
        ) => (
          <li key={index}>
            <input
              type="radio"
              id={`rating-${num}`}
              name="rating"
              value={`${num}`}
              checked={rating === num}
              onChange={handleChange}
            />
            <label htmlFor={`rating-${num}`}>{num}</label>
          </li>
        )
      )}
    </ul>
  );
}

export default RatingSelector;