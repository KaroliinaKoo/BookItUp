import Card from "./shared/Card";
import { FaTimes, FaEdit, FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import FeedbackContext from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import Prompt from "./shared/Prompt";

function ReviewItem({ item, profileView }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const { deleteItem, editItem } = useContext(FeedbackContext);
  const { showAlert } = useContext(AlertContext);
  const [expandBody, setExpandBody] = useState(false);
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "long" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleDelete = () => {
    deleteItem(item.id);
    showAlert("success", "Item deleted successfully");
  };

  return (
    <Card className={profileView ? "profile-view" : ""}>
      <Prompt
        title="Delete Review"
        message={`Are you sure you want to permanently delete the review:
        \n"${item.title}"?
        \nThis action cannot be undone!`}
        visible={showPrompt}
        onConfirm={() => handleDelete()}
        onCancel={() => setShowPrompt(false)}
      />
      <div className="num-display" aria-label="Rating">
        {item.rating}
        <span>/10</span>
      </div>
      <h2>{item.title}</h2>
      <span className="author-display">by {item.author}</span>
      <div
        className={`body-display ${
          item.body.length > 100 && (expandBody ? "expanded" : "collapsed")
        }`}
      >
        <p>{item.body}</p>
        {item.body.length > 100 && (
          <button onClick={() => setExpandBody(!expandBody)}>
            {expandBody ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      {!profileView && (
        <div className="name-display">
          <FaUserCircle /> {item.username}
        </div>
      )}
      <div className="date-display">
        {formatDate(item.date)}
        {item.updatedDate && (
          <>
            <span> Edited: </span>
            {item.updatedDate}
          </>
        )}
      </div>
      {profileView && (
        <div className="user-tools">
          <button onClick={() => setShowPrompt(true)}>
            <FaTimes className="btn-icon" /> Delete
          </button>
          <button
            onClick={() => {
              editItem(item);
              navigate("/add-review");
            }}
          >
            <FaEdit className="btn-icon" /> Edit
          </button>
        </div>
      )}
    </Card>
  );
}

export default ReviewItem;
