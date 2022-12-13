import React from "react";
import Card from "./shared/Card";
import { FaTimes, FaEdit, FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import ReviewContext, { ReviewDataTypes } from "../context/ReviewContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import Prompt from "./shared/Prompt";
import { truncate } from "../utils/truncate";
import VolumeDetails from "./VolumeDetailsModal";
import useFetchVolumeByID from "../hooks/useFetchVolumeByID";
import { formatDate } from "../utils/formatDate";
import BookItem from "./BookItem";

type PropTypes = {
  item: ReviewDataTypes;
  profileView: boolean;
};

function ReviewItem({ item, profileView }: PropTypes) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showVolumeDetails, setShowVolumeDetails] = useState(false);

  const reviewContext = useContext(ReviewContext);
  const alertContext = useContext(AlertContext);

  if (!reviewContext) {
    throw new Error("Context not found");
  }
  if (!alertContext) {
    throw new Error("AlertContext not found");
  }

  const { deleteItem, editItem } = reviewContext;
  const { showAlert } = alertContext;

  const [expandBody, setExpandBody] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteItem(item.id);
    showAlert("success", "Item deleted successfully");
  };

  const { isLoading, volumeData } = useFetchVolumeByID(item.volumeID);

  return (
    <>
      {showVolumeDetails && (
        <VolumeDetails
          volumeData={volumeData}
          handleClose={() => setShowVolumeDetails(false)}
        />
      )}

      <Card className={profileView ? "profile-view" : ""}>
        <Prompt
          title="Delete Review"
          message={`Are you sure you want to permanently delete the review for the book "${truncate(
            volumeData.title ?? "Unknown title",
            80
          )}"?`}
          visible={showPrompt}
          onConfirm={() => handleDelete()}
          onCancel={() => setShowPrompt(false)}
        />
        <div className="review-header">
          <div className="num-display" aria-label="Rating">
            {item.rating}
            <span>/10</span>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <BookItem
              key={volumeData.id}
              volumeData={volumeData}
              displayDescription={{ display: false }}
              displayDetails={false}
              displayReviewButton={false}
            />
          )}
        </div>
        {item.body && (
          <div
            className={`review-body ${
              item.body.length > 200 && (expandBody ? "expanded" : "")
            }`}
          >
            <p>{item.body}</p>
            {item.body.length > 100 && (
              <button onClick={() => setExpandBody(!expandBody)}>
                {expandBody ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        )}

        <div className="review-footer">
          {profileView && (
            <div className="user-tools">
              <button onClick={() => setShowPrompt(true)}>
                <FaTimes className="btn-icon" /> Delete
              </button>
              <button
                onClick={() => {
                  editItem(item);
                  navigate(`/review/${item.volumeID}`);
                }}
              >
                <FaEdit className="btn-icon" /> Edit
              </button>
            </div>
          )}

          <div className="detail-container">
            {!profileView && (
              <div className="name-display">
                <FaUserCircle />
                {item.username}
              </div>
            )}
            <div className="date-display">{formatDate(item.date)}</div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ReviewItem;

/*

import NewComment from "./NewComment";

const [showForm, setShowForm] = useState(false);

<button className="toggle-comment" onClick={() => setShowForm(true)}>
          <FaRegComments title="Add a Comment" aria-label="Add a Comment" />0
          Comments
        </button>

      {!profileView && showForm && (
        <NewComment showForm={showForm} setShowForm={setShowForm} />
      )}


*/
