import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/AlertContext";
import UserContext from "../../context/UserContext";
import { getUUID } from "../../utils/uuid";
import { sanitizeString } from "../../utils/sanitizeString";
import { useNavigate, useParams } from "react-router-dom";
import useFetchVolumeByID from "../../hooks/useFetchVolumeByID";
import useReviewUtils, { ReviewDataTypes } from "../../hooks/useReviewUtils";
import RatingSelector from "./RatingSelector";
import BookItem from "../../components/volumes/BookItem";
import useFetchReviewByID from "../../hooks/useFetchReviewByID";

function ReviewForm() {
  const navigate = useNavigate();

  const params = useParams();

  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  if (!alertContext || !userContext) {
    throw new Error("context not found");
  }
  const { addReview, updateReview } = useReviewUtils();

  let volumeID = params.volumeID?.toString() || "";
  let reviewID = params.reviewID?.toString() || "";

  const { volumeData, isLoading } = useFetchVolumeByID(volumeID);
  const { reviewData } = useFetchReviewByID(reviewID);

  const { showAlert } = alertContext;
  const { user } = userContext;

  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      throw new Error("user not found");
    }

    if (!volumeData) {
      throw new Error("volumeData not found");
    }

    if (!rating) {
      showAlert("warning", "Please select a rating");
      return;
    }

    let currentTime = new Date().toJSON();

    if (reviewID && reviewData) {
      let review: ReviewDataTypes = {
        ...reviewData,
        body: sanitizeString(body || "", false),
        rating,
        updateDate: currentTime,
      };
      updateReview(reviewID, review);
      showAlert("success", "Review updated successfully!");
      navigate("/dashboard/reviews");
    } else {
      let newReview: ReviewDataTypes = {
        volumeID,
        body: sanitizeString(body || "", false),
        rating,
        date: currentTime,
        id: getUUID(),
        userID: user.id,
        username: user.username,
      };
      addReview(newReview);
      showAlert("success", "Review submitted successfully!");
      navigate("/dashboard/reviews");
    }
  };

  useEffect(() => {
    if (reviewData) {
      setBody(reviewData.body);
      setRating(reviewData.rating);
    }
  }, [reviewData]);

  return (
    <div className="container volume-review-container">
      <h1>Write a Review</h1>
      <section className="volume-info">
        {isLoading ? (
          <div className="spinner" role="status" aria-label="Loading" />
        ) : (
          <BookItem volumeData={volumeData} layout="review-info" />
        )}
      </section>
      <form
        className="volume-review-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <section className="volume-review">
          <div className="input-group vertical">
            <label htmlFor="body">
              Your Review <span>(optional)</span>
              <span aria-label="Character count" className="character-count">
                {body?.length ?? 0}/2000
              </span>
            </label>
            <textarea
              name="body"
              placeholder="What did you think of the book?"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={2000}
            />
          </div>
          <RatingSelector
            currentRating={rating}
            select={(rating) => setRating(rating)}
          />
          <div className="btn-container">
            <button
              className="btn btn-secondary outlined"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!!rating ? false : true}
            >
              Submit Review
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ReviewForm;
