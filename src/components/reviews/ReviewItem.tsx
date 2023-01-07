import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import VolumeDetails from "../volumes/VolumeDetailsModal";
import useFetchVolumeByID from "../../hooks/useFetchVolumeByID";
import { formatDate } from "../../utils/formatDate";
import BookItem from "../volumes/BookItem";
import { ReviewDataTypes } from "../../hooks/useReviewUtils";

type PropTypes = {
  reviewData: ReviewDataTypes;
};

function ReviewItem({ reviewData }: PropTypes) {
  const [showVolumeDetails, setShowVolumeDetails] = useState(false);

  const { isLoading, volumeData } = useFetchVolumeByID(reviewData.volumeID);

  return (
    <>
      {showVolumeDetails && (
        <VolumeDetails
          volumeData={volumeData}
          handleClose={() => setShowVolumeDetails(false)}
        />
      )}
      <div className="review-item-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <BookItem
            key={volumeData.id}
            volumeData={volumeData}
            layout="review-header"
          />
        )}

        <div className={`review-body`}>
          <div className="num-display" aria-label="Rating">
            {reviewData.rating}
            <span>/10</span>
          </div>
          <p className="review-text">
            {reviewData.body || (
              <span className="placeholder">No review written.</span>
            )}
          </p>
        </div>
        <div className="review-footer">
          <div className="name-display">
            <FaUserCircle />
            {reviewData.username}
          </div>

          <div className="date-display">
            <span className="date">{formatDate(reviewData.date)}</span>
            {reviewData.updateDate && (
              <span className="update-date">
                {" "}
                (Edited {formatDate(reviewData.updateDate)})
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewItem;
