import React from "react";
import Card from "./shared/Card";
import { FaTimes, FaEdit, FaUserCircle, FaRegComments } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../context/ReviewContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import Prompt from "./shared/Prompt";
import NewComment from "./NewComment";
import { ReviewDataTypes } from "../queries/DataTypes";

type PropTypes = {
  item: ReviewDataTypes;
  profileView: boolean;
};

function ReviewItem({ item, profileView }: PropTypes) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [volumeData, setVolumeData] = useState<any>({});

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

  const formatDate: (date: string) => string = (date) => {
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

  useEffect(() => {
    if (item) {
      const fetchVolume = async (id: string) => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const data = await response.json();
        setVolumeData(data.volumeInfo);
        console.log(data);
      };
      fetchVolume(item.volumeID);
    }
  }, [item]);

  return (
    <Card className={profileView ? "profile-view" : ""}>
      <Prompt
        title="Delete Review"
        message={`Are you sure you want to permanently delete the review for ${item.volumeID}?`}
        visible={showPrompt}
        onConfirm={() => handleDelete()}
        onCancel={() => setShowPrompt(false)}
      />
      <div className="review-header">
        <div className="num-display" aria-label="Rating">
          {item.rating}
          <span>/10</span>
        </div>
        <div className="review-title">
          <h2>{volumeData.title ? volumeData.title : "No title"}</h2>
          <span className="author-display">
            by{" "}
            {volumeData.authors
              ? [...volumeData.authors].join(", ")
              : "Unknown Author"}
          </span>
        </div>
      </div>
      {item.body && (
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
                navigate("/add-review");
              }}
            >
              <FaEdit className="btn-icon" /> Edit
            </button>
          </div>
        )}
        <button className="toggle-comment" onClick={() => setShowForm(true)}>
          <FaRegComments title="Add a Comment" aria-label="Add a Comment" />0
          Comments
        </button>
        <div className="detail-container">
          {!profileView && (
            <div className="name-display">
              <FaUserCircle /> {item.username}
            </div>
          )}
          <div className="date-display">{formatDate(item.date)}</div>
        </div>
      </div>
      {!profileView && showForm && (
        <NewComment showForm={showForm} setShowForm={setShowForm} />
      )}
    </Card>
  );
}

export default ReviewItem;
