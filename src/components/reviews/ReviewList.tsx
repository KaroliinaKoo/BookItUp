import React from "react";
import ReviewItem from "./ReviewItem";
import { ReviewDataTypes } from "../../hooks/useReviewUtils";

type PropTypes = {
  reviewList: ReviewDataTypes[];
};

const ReviewList: React.FC<PropTypes> = ({ reviewList }) => {
  return (
    <div className="review-list">
      {reviewList.map((review: ReviewDataTypes) => (
        <ReviewItem key={review.id} reviewData={review} />
      ))}
    </div>
  );
};

export default ReviewList;
