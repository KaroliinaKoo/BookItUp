import { ReviewList } from "../../components/reviews";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import React from "react";
import ReviewSearch from "./ReviewsSearch";
import useFetchReviewList from "../../hooks/useFetchReviewList";

function FindReview() {
  const {
    queryOptions,
    setQueryOptions,
    isLoading,
    reviewListData,
    fetchReviewsByQuery,
  } = useFetchReviewList();

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
      <ReviewSearch
        queryOptions={queryOptions}
        setQueryOptions={setQueryOptions}
        fetchReviewsByQuery={fetchReviewsByQuery}
      />
      {reviewListData.length === 0 && <span>No results found</span>}
      {isLoading ? (
        <div className="spinner" role="status" />
      ) : (
        <ReviewList reviewList={reviewListData} />
      )}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}

export default FindReview;
