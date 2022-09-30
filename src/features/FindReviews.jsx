import FeedbackList from "../components/FeedbackList";
import ReviewSearch from "../components/ReviewSearch";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useEffect } from "react";

function FindReview() {
  const [search, setSearch] = useState({
    title: "",
    author: "",
    rating: "",
    username: "",
  });

  const [sortBy, setSortBy] = useState("newest");
  const [showScroll, setShowScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollEvent = (e) => {
    setScrollPosition(e.target.scrollTop);
    if (e.target.scrollTop > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    document.getElementsByClassName("container")[0].scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container" onScroll={scrollEvent}>
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
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollTop}>
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}

export default FindReview;
