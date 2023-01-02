import React, { useState, useContext } from "react";
import { FaBook, FaPen } from "react-icons/fa";
import {
  VolumeFormattedType,
  formatStringArray,
} from "../../queries/utils/formatVolumeData";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import VolumeDetailsModal from "./VolumeDetailsModal";
import useBreakpointListener from "../../hooks/useBreakpointListener";

type PropTypes = {
  layout: "list-card" | "review-header" | "modal-content" | "review-info";
  volumeData: VolumeFormattedType;
};

function BookItem({ layout, volumeData }: PropTypes) {
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();
  const breakpoint = useBreakpointListener(320);

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("context not found");
  }

  const { userIsAuthenticated } = context;

  const VolumeTitle = () => {
    return (
      <div className="volume-info-title-container">
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

  const VolumeDescription = ({
    displayFullDescription,
  }: {
    displayFullDescription?: boolean;
  }) => {
    return (
      <div className="volume-info-description-container">
        <p
          className={`description ${displayFullDescription ? "expanded" : ""}`}
        >
          {volumeData.description}
        </p>
      </div>
    );
  };

  const VolumeCover = () => {
    return (
      <div className="volume-info-cover-container">
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
      <div className="volume-info-detail-container">
        <div className="detail-container">
          <span className="detail-label">Publisher: </span>
          {volumeData.publisher}
          {volumeData.publishedDate && ` (${volumeData.publishedDate})`}
        </div>
        <div className="detail-container">
          <span className="detail-label">Language: </span>
          {volumeData.language}
        </div>
        <div className="detail-container">
          <span className="detail-label">Pages: </span> {volumeData.pageCount}
        </div>
        {volumeData.category && (
          <div className="detail-container">
            <span className="detail-label">Category: </span>
            {volumeData.category[0]}
          </div>
        )}
      </div>
    );
  };

  const VolumeReviewBtn = () => {
    return (
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
    );
  };

  const VolumeDetailsBtn = () => {
    return (
      <button
        aria-label="Book details"
        className="volume-info-details-btn btn-secondary small"
        onClick={() => {
          setShowDetails(true);
        }}
      >
        <FaBook />
        Details
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
      {layout === "review-header" && (
        <div className={`volume-info review-header`}>
          <VolumeTitle />
          <VolumeCover />
          <VolumeDetailsBtn />
        </div>
      )}
      {layout === "list-card" && (
        <>
          {breakpoint ? (
            <div className={`card volume-info list-card compact`}>
              <VolumeCover />
              <div className="body-container">
                <VolumeTitle />
                <VolumeDescription />
              </div>
              <div className="btn-container">
                <VolumeDetailsBtn /> <VolumeReviewBtn />
              </div>
            </div>
          ) : (
            <div className={`card volume-info list-card`}>
              <div className="left">
                <VolumeTitle />
                <VolumeDescription />
                <div className="btn-container">
                  <VolumeReviewBtn />
                </div>
              </div>
              <div className="right">
                <VolumeCover /> <VolumeDetails />
                <VolumeDetailsBtn />
              </div>
            </div>
          )}
        </>
      )}
      {layout === "review-info" && (
        <>
          {breakpoint ? (
            <div className={`card volume-info review-info-card compact`}>
              <VolumeCover />
              <div className="body-container">
                <VolumeTitle />
                <VolumeDescription displayFullDescription />
              </div>
            </div>
          ) : (
            <div className={`card volume-info review-info-card`}>
              <div className="left">
                <VolumeTitle />
                <VolumeDescription displayFullDescription />
              </div>
              <div className="right">
                <VolumeCover /> <VolumeDetails />
              </div>
            </div>
          )}
        </>
      )}
      {layout === "modal-content" && (
        <div className={`volume-info volume-info-modal-content`}>
          <div className="header-container">
            <VolumeCover />
            <VolumeTitle />
            <VolumeDetails />
          </div>
          <VolumeDescription displayFullDescription />
        </div>
      )}
    </>
  );
}

export default BookItem;
