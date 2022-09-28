import { useState } from "react";
import { FaSearch, FaChevronUp, FaTimes } from "react-icons/fa";

function ReviewSearch({ setSearch }) {
  const [showSearch, setShowSearch] = useState(true);

  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setSearch({
      title: "",
      author: "",
      rating: "",
      username: "",
    });
  };

  return (
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
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <button className="reset" type="reset" onClick={() => handleReset()}>
          <FaTimes /> Clear all
        </button>
      </form>
    </div>
  );
}

export default ReviewSearch;
