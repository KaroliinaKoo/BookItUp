import React, { useState, useRef } from "react";
import BookList from "../components/BookList";
import BookSearch from "../components/BookSearch";
import { FaChevronUp } from "react-icons/fa";

function FindBooks() {
  const [showScroll, setShowScroll] = useState(false);
  const searchCount = useRef(0);

  const scrollEvent = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollTop > 500) {
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
      <h1>Find Books</h1>
      <BookSearch searchCount={searchCount} />
      <BookList searchCount={searchCount} />
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}
export default FindBooks;
