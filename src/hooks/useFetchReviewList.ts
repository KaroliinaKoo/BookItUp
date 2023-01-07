import { useState, useEffect } from "react";
import { ReviewDataTypes } from "./useReviewUtils";

export type ReviewQueryOptions = {
  username?: string;
  rating?: string;
};

export const initialQueryOptions: ReviewQueryOptions = {
  username: "",
  rating: "",
};

function useFetchReviewList() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviewListData, setReviewListData] = useState<ReviewDataTypes[]>([]);
  const [queryOptions, setQueryOptions] =
    useState<ReviewQueryOptions>(initialQueryOptions);

  // Initial fetch
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3001/review?_sort=date&_order=desc`
        );
        const data = await response.json();
        setReviewListData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const fetchReviewsByQuery = async (
    queryOptions: ReviewQueryOptions = initialQueryOptions
  ) => {
    const { username, rating } = queryOptions;

    if (!username && !rating) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3001/review?_sort=date&_order=desc`
      );
      const data: ReviewDataTypes[] = await response.json();

      const filteredData = data.filter((review) => {
        if (username && rating) {
          return (
            review.username.toLowerCase().includes(username.toLowerCase()) &&
            Number(review.rating) === Number(rating)
          );
        } else if (username) {
          return review.username.toLowerCase().includes(username.toLowerCase());
        } else if (rating) {
          return Number(review.rating) === Number(rating);
        }
      });
      setReviewListData(filteredData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    reviewListData,
    queryOptions,
    setQueryOptions,
    fetchReviewsByQuery,
  };
}

export default useFetchReviewList;
