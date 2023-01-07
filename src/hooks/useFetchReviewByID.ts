import { useEffect, useState } from "react";
import { ReviewDataTypes } from "./useReviewUtils";

const useFetchReviewByID = (reviewID: string) => {
  const [reviewData, setReviewData] = useState<ReviewDataTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3001/review/${reviewID}`
        );
        const data: ReviewDataTypes = await response.json();
        setReviewData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reviewID]);

  return { reviewData, isLoading };
};

export default useFetchReviewByID;
