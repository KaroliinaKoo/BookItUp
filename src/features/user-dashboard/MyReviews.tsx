import { useState, useEffect } from "react";
import { ReviewItem } from "../../components/reviews";
import React from "react";
import { UserDataTypes } from "../../context/UserContext";
import { ReviewItemUserTools } from "../../components/reviews";
import useFetchReviewList from "../../hooks/useFetchReviewList";
import { ReviewDataTypes } from "../../hooks/useReviewUtils";

type Props = {
  user: UserDataTypes;
};

function MyReviews({ user }: Props) {
  const { isLoading, reviewListData } = useFetchReviewList();

  const [myReviews, setMyReviews] = useState<ReviewDataTypes[]>([]);

  useEffect(() => {
    if (reviewListData) {
      const reviews = reviewListData.filter(
        (item) => item.username === user.username
      );
      setMyReviews(reviews);
    }
  }, [reviewListData]);

  return (
    <>
      <div className="user-reviews">
        {isLoading && <div className="spinner" role="status" />}
        <div className="review-list">
          {myReviews.length === 0 && (
            <p>You have not written any reviews yet.</p>
          )}

          {myReviews.length > 0 &&
            myReviews.map((review) => (
              <div className="review-item" key={`container-${review.id}`}>
                <ReviewItemUserTools
                  key={`user-tools-${review.id}`}
                  reviewData={review}
                />
                <ReviewItem
                  key={`review-item-${review.id}`}
                  reviewData={review}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default MyReviews;
