import ReviewList from "../components/ReviewList";
import ReviewSearch from "../components/ReviewSearch";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import React from "react";

export type Types = {
  searchBy: "title" | "author" | "rating" | "username";
  sortBy: "newest" | "oldest" | "highest" | "lowest";
};

export type SearchByTypes = Record<Types["searchBy"], string>;
export type SortByTypes = Types["sortBy"];

function FindReview() {
  const [searchBy, setSearchBy] = useState({
    title: "",
    author: "",
    rating: "",
    username: "",
  });

  const [sortBy, setSortBy] = useState("newest" as SortByTypes);
  const [showScroll, setShowScroll] = useState(false);

  const scrollEvent = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    document.getElementsByClassName("container")[0].scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container" onScroll={scrollEvent}>
      <h1>Find Reviews</h1>
      <ReviewSearch setSearchBy={setSearchBy} />
      <div className="sort-by">
        <label htmlFor="sort">Order by:</label>
        <select
          name="sort"
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortByTypes)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
      <ReviewList searchBy={searchBy} sortBy={sortBy} />
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}

export default FindReview;