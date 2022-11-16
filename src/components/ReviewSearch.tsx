import React, { useState } from "react";
import { FaSearch, FaChevronUp, FaTimes } from "react-icons/fa";
import { SearchByTypes } from "../features/FindReviews";

type PropTypes = {
  setSearchBy: React.Dispatch<React.SetStateAction<SearchByTypes>>;
};

function ReviewSearch({ setSearchBy }: PropTypes) {
  const [showSearch, setShowSearch] = useState(true);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchBy((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setSearchBy({
      title: "",
      author: "",
      rating: "",
      username: "",
    });
  };

  const setOptions = () => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <>
      <div className="review-search">
        {showSearch && (
          <button aria-label="Hide Search" onClick={() => setShowSearch(false)}>
            <FaChevronUp /> Search
          </button>
        )}
        {!showSearch && (
          <button aria-label="Show Search" onClick={() => setShowSearch(true)}>
            <FaSearch />
            Search
          </button>
        )}
        <form className={showSearch ? "" : "hide"}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="author">Author</label>
            <input type="text" name="author" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="rating">Rating</label>
            <select name="rating" onChange={handleChange}>
              <option value="" aria-label="Any">
                Any
              </option>
              {setOptions()}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={handleChange} />
          </div>
          <button
            className="reset btn-link"
            type="reset"
            onClick={() => handleReset()}
          >
            <FaTimes /> Clear all
          </button>
        </form>
      </div>
    </>
  );
}

export default ReviewSearch;
