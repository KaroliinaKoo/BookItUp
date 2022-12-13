import React, { useState, useContext } from "react";
import { FaPen } from "react-icons/fa";
import {
  VolumeFormattedType,
  formatStringArray,
} from "../queries/utils/formatVolumeData";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import VolumeDetailsModal from "./VolumeDetailsModal";

type PropTypes = {
  volumeData: VolumeFormattedType;
  displayDescription?: { display: boolean; full?: boolean };
  displayDetails?: boolean;
  displayHeader?: boolean;
  displayCover?: boolean;
  displayReviewButton?: boolean;
  displayDetailsButton?: boolean;
};

function BookItem({
  volumeData,
  displayDescription = { display: true, full: false },
  displayDetails = true,
  displayHeader = true,
  displayCover = true,
  displayReviewButton = true,
  displayDetailsButton = true,
}: PropTypes) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("context not found");
  }

  const { userIsAuthenticated } = context;

  const VolumeHeader = () => {
    return (
      <div className="volume-header-container">
        {volumeData.title && <h2 className="title">{volumeData.title}</h2>}
        {volumeData.subtitle && (
          <h3 className="subtitle">{volumeData.subtitle}</h3>
        )}
        {volumeData.authors && (
          <div className="author">{formatStringArray(volumeData.authors)}</div>
        )}
      </div>
    );
  };

  const VolumeDescription = () => {
    return (
      <div
        className={`volume-description-container ${
          displayDescription.full ? "expanded" : ""
        }`}
      >
        <p className="description">{volumeData.description}</p>
      </div>
    );
  };

  const VolumeCover = () => {
    return (
      <div className="volume-cover-container">
        {volumeData.imageLinks && (
          <img
            className="volume-cover"
            src={volumeData.imageLinks.thumbnail}
            alt={`Cover of ${volumeData.title}`}
          />
        )}
      </div>
    );
  };

  const VolumeDetails = () => {
    return (
      <div className="volume-detail-container">
        <div className="detail-info-container">
          <span className="detail-label">Publisher: </span>
          {volumeData.publisher}
          {volumeData.publishedDate && ` (${volumeData.publishedDate})`}
        </div>
        <div className="detail-info-container">
          <span className="detail-label">Language: </span>
          {volumeData.language}
        </div>
        <div className="detail-info-container">
          <span className="detail-label">Pages: </span> {volumeData.pageCount}
        </div>
        {volumeData.category && (
          <div className="detail-info-container">
            <span className="detail-label">Category: </span>
            {volumeData.category[0]}
          </div>
        )}
      </div>
    );
  };

  const VolumeReviewBtn = () => {
    return (
      <div className="volume-review-btn-container">
        <button
          disabled={!userIsAuthenticated}
          className="btn-primary small volume-review-btn"
          aria-label={`Write a review of ${volumeData.title}`}
          onClick={() => {
            navigate(`/review/${volumeData.id}`);
          }}
        >
          <FaPen />
          Review
        </button>
      </div>
    );
  };

  const VolumeDetailsBtn = () => {
    return (
      <button
        className="volume-details-btn btn btn-secondary small"
        onClick={() => {
          setShowDetails(true);
        }}
      >
        View Details
      </button>
    );
  };

  return (
    <>
      {showDetails && (
        <VolumeDetailsModal
          volumeData={volumeData}
          handleClose={() => {
            setShowDetails(false);
          }}
        />
      )}
      <div className="card volume-info-card grid-wide">
        {displayHeader && <VolumeHeader />}
        {displayCover && <VolumeCover />}
        {displayDetailsButton && <VolumeDetailsBtn />}
        {displayDescription.display && <VolumeDescription />}
        {displayDetails && <VolumeDetails />}
        {displayReviewButton && <VolumeReviewBtn />}
      </div>
    </>
  );
}

export default BookItem;
