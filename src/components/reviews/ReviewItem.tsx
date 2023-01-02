import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import ReviewContext, { ReviewDataTypes } from "../../context/ReviewContext";
import VolumeDetails from "../volumes/VolumeDetailsModal";
import useFetchVolumeByID from "../../hooks/useFetchVolumeByID";
import { formatDate } from "../../utils/formatDate";
import BookItem from "../volumes/BookItem";

type PropTypes = {
  item: ReviewDataTypes;
};

function ReviewItem({ item }: PropTypes) {
  const [showVolumeDetails, setShowVolumeDetails] = useState(false);

  const reviewContext = useContext(ReviewContext);

  if (!reviewContext) {
    throw new Error("Context not found");
  }

  const { isLoading, volumeData } = useFetchVolumeByID(item.volumeID);

  return (
    <>
      {showVolumeDetails && (
        <VolumeDetails
          volumeData={volumeData}
          handleClose={() => setShowVolumeDetails(false)}
        />
      )}
      <>
        <div className="review-header">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <BookItem
                key={volumeData.id}
                volumeData={volumeData}
                layout="review-header"
              />
            </>
          )}
        </div>

        <div className={`review-body`}>
          <div className="num-display" aria-label="Rating">
            {item.rating}
            <span>/10</span>
          </div>
          <p className="review-text">
            {item.body || (
              <span className="placeholder">No review written.</span>
            )}
          </p>
        </div>
        <div className="review-footer">
          <div className="name-display">
            <FaUserCircle />
            {item.username}
          </div>

          <div className="date-display">
            <span className="date">{formatDate(item.date)}</span>
            {item.updateDate && (
              <span className="update-date">
                {" "}
                (Edited {formatDate(item.updateDate)})
              </span>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default ReviewItem;
