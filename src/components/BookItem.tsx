import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import {
  VolumeFormattedType,
  formatStringArray,
} from "../queries/utils/formatVolumeData";
import VolumeDetails from "./VolumeDetails";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  volumeData: VolumeFormattedType;
  fullDescription: boolean;
  isListItem: boolean;
};

function BookItem({
  volumeData,
  fullDescription,
  isListItem = false,
}: PropTypes) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {showDetails && (
        <VolumeDetails
          volumeData={volumeData}
          handleClose={() => setShowDetails(false)}
        />
      )}

      <div className="card volume-info-card">
        <div className="info-header">
          {volumeData.title && <h2 className="title">{volumeData.title}</h2>}
          {volumeData.subtitle && (
            <h3 className="subtitle">{volumeData.subtitle}</h3>
          )}
          {volumeData.authors && (
            <div className="author">
              {formatStringArray(volumeData.authors)}
            </div>
          )}
        </div>
        {volumeData.description && (
          <div className={`description ${fullDescription ? "expanded" : ""}`}>
            <p>{volumeData.description}</p>
          </div>
        )}
        <div className="detail-container">
          {volumeData.imageLinks && (
            <img
              className="volume-cover"
              src={volumeData.imageLinks.thumbnail}
              alt={`Cover of ${volumeData.title}`}
            />
          )}
          {isListItem && (
            <button
              className="volume-details-btn btn btn-secondary small"
              onClick={() => {
                setShowDetails(true);
              }}
            >
              View Details
            </button>
          )}
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
        {isListItem && (
          <button
            className="btn-primary small volume-review-btn"
            aria-label={`Write a review of ${volumeData.title}`}
            onClick={() => {
              navigate(`/review/${volumeData.id}`);
            }}
          >
            <FaPen />
            Review
          </button>
        )}
      </div>
    </>
  );
}

export default BookItem;
