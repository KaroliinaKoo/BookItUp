import React, { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AlertContext from "../../context/AlertContext";
import Prompt from "../shared/Prompt";
import useReviewUtils, { ReviewDataTypes } from "../../hooks/useReviewUtils";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  reviewData: ReviewDataTypes;
};

function ReviewItemUserTools({ reviewData }: PropTypes) {
  const navigate = useNavigate();
  const alertContext = useContext(AlertContext);

  const [showPrompt, setShowPrompt] = useState(false);

  const { deleteReview } = useReviewUtils();

  if (!alertContext) {
    throw new Error("AlertContext not found");
  }
  const { showAlert } = alertContext;

  const handleDelete = () => {
    deleteReview(reviewData.id);
    showAlert("success", "Item deleted successfully");
    setShowPrompt(false);
    window.location.reload();
  };

  return (
    <div className="user-tools">
      <Prompt
        title="Delete Review"
        message={`Are you sure you want to permanently delete this review?`}
        visible={showPrompt}
        onConfirm={() => handleDelete()}
        onCancel={() => setShowPrompt(false)}
      />
      <button
        className="btn-icon"
        onClick={() => {
          navigate(`/review/${reviewData.volumeID}/${reviewData.id}/edit`);
        }}
      >
        <FaEdit />
      </button>
      <button className="btn-icon" onClick={() => setShowPrompt(true)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ReviewItemUserTools;
