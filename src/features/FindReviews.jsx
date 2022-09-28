import FeedbackList from "../components/FeedbackList";
import ReviewSearch from "../components/ReviewSearch";
import { useState } from "react";

function FindReview() {
  const [search, setSearch] = useState({
    title: "",
    author: "",
    rating: "",
    username: "",
  });

  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="container">
      <h1>Find Reviews</h1>
      <ReviewSearch setSearch={setSearch} />
      <div className="sort-by">
        <label htmlFor="sort">Order by:</label>
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
      <FeedbackList search={search} sortBy={sortBy} />
    </div>
  );
}

export default FindReview;
