import React from "react";
import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import { FeedbackContext } from "../context/FeedbackContext";
import { FeedbackTypes } from "../queries/DataTypes";
import { SearchByTypes, SortByTypes } from "../features/FindReviews";

type PropTypes = {
  searchBy: SearchByTypes;
  sortBy: SortByTypes;
};

/**
 * @TODO - figure out why feedback.filter is not working
 *
 **/

const FeedbackList: React.FC<PropTypes> = ({ searchBy, sortBy }) => {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("Context not found");
  }

  const { feedback, itemIsLoading } = context;

  if (!itemIsLoading && (!feedback || feedback.length === 0)) {
    return <p>No reviews found.</p>;
  }

  return itemIsLoading ? (
    <div className="spinner" role="status" />
  ) : (
    <div className="feedback-list">
      {feedback
        .filter((item: FeedbackTypes) => {
          if (
            searchBy.title === "" &&
            searchBy.author === "" &&
            searchBy.rating === "" &&
            searchBy.username === ""
          ) {
            return item;
          } else if (
            item.title.toLowerCase().includes(searchBy.title.toLowerCase()) &&
            item.author.toLowerCase().includes(searchBy.author.toLowerCase()) &&
            item.rating.toString() === searchBy.rating &&
            item.username
              .toLowerCase()
              .includes(searchBy.username.toLowerCase())
          ) {
            return item;
          }
        })

        .map((item: FeedbackTypes) => (
          <FeedbackItem key={item.id} item={item} profileView={false} />
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

export default FeedbackList;
