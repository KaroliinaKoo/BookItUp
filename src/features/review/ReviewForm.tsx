import React, { useEffect, useState, useContext } from "react";
import RatingSelector from "../../components/RatingSelector";
import ReviewContext, { ReviewDataTypes } from "../../context/ReviewContext";
import AlertContext from "../../context/AlertContext";
import UserContext from "../../context/UserContext";
import { getUUID } from "../../utils/uuid";
import { sanitizeString } from "../../utils/sanitizeString";
import BookItem from "../../components/BookItem";
import { useNavigate, useParams } from "react-router-dom";
import useFetchVolumeByID from "../../hooks/useFetchVolumeByID";

function ReviewForm() {
  const navigate = useNavigate();

  let volumeIDParam = useParams();
  const [volumeID, setVolumeID] = useState(volumeIDParam.volumeID?.toString());

  const reviewContext = useContext(ReviewContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  if (!reviewContext || !alertContext || !userContext) {
    throw new Error("context not found");
  }

  const { volumeData, isLoading } = useFetchVolumeByID(volumeID || "");

  const { addItem, updateItem, itemIsEditing, cancelEdit } = reviewContext;
  const { showAlert } = alertContext;
  const { user } = userContext;

  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (
      itemIsEditing.isEditing &&
      itemIsEditing.item &&
      itemIsEditing.item.volumeID
    ) {
      setVolumeID(itemIsEditing.item.volumeID);
      setReviewBody(itemIsEditing.item.body);
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let currentTime = new Date().toJSON();

    if (volumeID && rating) {
      const newReview: ReviewDataTypes = {
        volumeID,
        body: sanitizeString(reviewBody, true),
        rating,
        date: currentTime,
        id: getUUID(),
        userID: user.id,
        username: user.username,
      };

      if (itemIsEditing.isEditing && itemIsEditing.item) {
        updateItem(itemIsEditing.item.id, newReview);
        showAlert("success", "Review updated successfully!");
      } else {
        addItem(newReview);
        showAlert("success", "Review submitted successfully!");
      }
      reset();
      navigate("/dashboard/reviews");
    } else {
      showAlert("error", "Please fill out all required fields.");
    }
  };

  const reset = () => {
    setVolumeID("");
    setReviewBody("");
    setRating(0);
  };

  const handleCancel = () => {
    cancelEdit();
    reset();
    navigate("/dashboard/reviews");
  };

  return (
    <div className="container volume-review">
      <h1>{itemIsEditing.isEditing ? "Edit Review" : "Write a Review"}</h1>

      <form
        className="volume-review-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <section className="volume-info">
          {isLoading ? (
            <div
              className="spinner"
              role="status"
              aria-label="Loading book information"
            />
          ) : (
            <BookItem
              volumeData={volumeData}
              fullDescription={true}
              isListItem={false}
            />
          )}
        </section>
        <section className="volume-review">
          <div className="input-group vertical">
            <label htmlFor="body">
              Your Review (optional)
              <span aria-label="Characters left" className="character-count">
                {2000 - reviewBody.length}/2000
              </span>
            </label>
            <textarea
              name="body"
              placeholder="What did you think of the book?"
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              maxLength={2000}
            />
          </div>
          <RatingSelector select={(rating) => setRating(rating)} />
          <div className="btn-container">
            {itemIsEditing.isEditing && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </button>
            )}
            <button className="btn btn-primary" type="submit">
              {itemIsEditing.isEditing ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ReviewForm;
