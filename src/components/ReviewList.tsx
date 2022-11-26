import React from "react";
import { useContext } from "react";
import ReviewItem from "./ReviewItem";
import { ReviewContext } from "../context/ReviewContext";
import { ReviewDataTypes } from "../queries/DataTypes";
import { SortByTypes } from "../features/FindReviews";

type PropTypes = {
  searchBy: string;
  sortBy: SortByTypes;
};

/**
 * @TODO - figure out why reviewData.filter is not working
 *
 **/

const ReviewList: React.FC<PropTypes> = ({ searchBy, sortBy }) => {
  const context = useContext(ReviewContext);

  if (!context) {
    throw new Error("Context not found");
  }

  const { reviewData, itemIsLoading } = context;

  if (!itemIsLoading && (!reviewData || reviewData.length === 0)) {
    return <p>No reviews found.</p>;
  }

  console.log(searchBy);

  return itemIsLoading ? (
    <div className="spinner" role="status" />
  ) : (
    <div className="review-list">
      {reviewData
        // .filter((review: ReviewDataTypes) => {
        //   if (
        //     searchBy.title === "" &&
        //     searchBy.author === "" &&
        //     searchBy.rating === "" &&
        //     searchBy.username === ""
        //   ) {
        //     return review;
        //   } else if (
        //     review.title.toLowerCase().includes(searchBy.title.toLowerCase()) &&
        //     review.author
        //       .toLowerCase()
        //       .includes(searchBy.author.toLowerCase()) &&
        //     review.rating.toString() === searchBy.rating &&
        //     review.username
        //       .toLowerCase()
        //       .includes(searchBy.username.toLowerCase())
        //   ) {
        //     return review;
        //   }
        // })

        .map((review: ReviewDataTypes) => (
          <ReviewItem key={review.id} item={review} profileView={false} />
        ))
        .sort((a, b) => {
          if (sortBy === "newest") {
            return (
              new Date(b.props.item.date).getTime() -
              new Date(a.props.item.date).getTime()
            );
          } else if (sortBy === "oldest") {
            return (
              new Date(a.props.item.date).getTime() -
              new Date(b.props.item.date).getTime()
            );
          } else if (sortBy === "highest") {
            return b.props.item.rating - a.props.item.rating;
          } else if (sortBy === "lowest") {
            return a.props.item.rating - b.props.item.rating;
          }
          return b.props.item.id - a.props.item.id;
        })}
    </div>
  );
};

export default ReviewList;
