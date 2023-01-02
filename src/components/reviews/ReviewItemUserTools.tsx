import React, { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AlertContext from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import Prompt from "../shared/Prompt";

import ReviewContext, { ReviewDataTypes } from "../../context/ReviewContext";

type PropTypes = {
  item: ReviewDataTypes;
};

function ReviewItemUserTools({ item }: PropTypes) {
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();

  const reviewContext = useContext(ReviewContext);

  const [showPrompt, setShowPrompt] = useState(false);

  if (!alertContext) {
    throw new Error("AlertContext not found");
  }

  if (!reviewContext) {
    throw new Error("Context not found");
  }

  const { deleteItem, editItem } = reviewContext;
  const { showAlert } = alertContext;

  const handleDelete = () => {
    deleteItem(item.id);
    showAlert("success", "Item deleted successfully");
  };

  const handleEdit = (item: ReviewDataTypes) => {
    editItem(item);
    navigate(`/review/${item.volumeID}`);
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
          handleEdit(item);
          navigate(`/review/${item.volumeID}`);
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
