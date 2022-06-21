import React from "react";
import { useState } from "react";

function RatingSelector() {
  const [selected, setSelected] = useState(5);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <ul className="rating">
      <li>
        <input
          type="radio"
          id="rating-1"
          name="rating"
          value="1"
          checked={selected === 1}
          onChange={handleChange}
        />
        <label htmlFor="rating-1">1</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-2"
          name="rating"
          value="2"
          checked={selected === 2}
          onChange={handleChange}
        />
        <label htmlFor="rating-2">2</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-3"
          name="rating"
          value="3"
          checked={selected === 3}
          onChange={handleChange}
        />
        <label htmlFor="rating-3">3</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-4"
          name="rating"
          value="4"
          checked={selected === 4}
          onChange={handleChange}
        />
        <label htmlFor="rating-4">4</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-5"
          name="rating"
          value="5"
          checked={selected === 5}
          onChange={handleChange}
        />
        <label htmlFor="rating-5">5</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-6"
          name="rating"
          value="6"
          checked={selected === 6}
          onChange={handleChange}
        />
        <label htmlFor="rating-6">6</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-7"
          name="rating"
          value="7"
          checked={selected === 7}
          onChange={handleChange}
        />
        <label htmlFor="rating-7">7</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-8"
          name="rating"
          value="8"
          checked={selected === 8}
          onChange={handleChange}
        />
        <label htmlFor="rating-8">8</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-9"
          name="rating"
          value="9"
          checked={selected === 9}
          onChange={handleChange}
        />
        <label htmlFor="rating-9">9</label>
      </li>
      <li>
        <input
          type="radio"
          id="rating-10"
          name="rating"
          value="10"
          checked={selected === 10}
          onChange={handleChange}
        />
        <label htmlFor="rating-10">10</label>
      </li>
    </ul>
  );
}

export default RatingSelector;
