import { useState } from "react";

export type ReviewDataTypes = {
  volumeID: string;
  body: string;
  rating: number;
  date: string;
  updateDate?: string;
  id: string;
  userID: number;
  username: string;
};

function useReviewUtils() {
  const [reviewData, setReviewData] = useState<ReviewDataTypes[] | []>([]);

  const addReview = async (item: ReviewDataTypes) => {
    const response = await fetch("http://localhost:3001/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data: ReviewDataTypes = await response.json();
    setReviewData([data, ...reviewData]);
  };

  const deleteReview = async (id: ReviewDataTypes["id"]) => {
    await fetch(`http://localhost:3001/review/${id}`, {
      method: "DELETE",
    });
    setReviewData(reviewData.filter((item: ReviewDataTypes) => item.id !== id));
  };

  const updateReview = async (
    id: ReviewDataTypes["id"],
    updatedItem: ReviewDataTypes
  ) => {
    const response = await fetch(`http://localhost:3001/review/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    setReviewData(
      reviewData.map((review) => (review.id === id ? data : review))
    );
  };

  return {
    deleteReview,
    addReview,
    updateReview,
  };
}

export default useReviewUtils;
