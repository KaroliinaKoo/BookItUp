import React, { useEffect, useState, useContext } from "react";
import Input from "./shared/Input";
import RatingSelector from "./RatingSelector";
import { FeedbackContext } from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import User from "../modules/user";
import { authorsList, titlesList } from "../utils/datalists";
import { FeedbackTypes } from "../queries/DataTypes";
import { getUUID } from "../utils/uuid";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("Context not found");
  }

  const { addItem, updateItem, itemIsEditing, cancelEdit } = context;
  const { showAlert } = useContext(AlertContext);

  const titleMinLength = 1;
  const authorMinLength = 1;

  useEffect(() => {
    if (itemIsEditing.isEditing && itemIsEditing.item) {
      setTitle(itemIsEditing.item.title);
      setBody(itemIsEditing.item.body);
      setAuthor(itemIsEditing.item.author);
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let currentTime = new Date().toJSON();

    if (
      author.replace(/\s+/g, "").length >= authorMinLength &&
      title.replace(/\s+/g, "").length >= titleMinLength
    ) {
      const newFeedback: FeedbackTypes = {
        title,
        author,
        body,
        rating,
        date: currentTime,
        id: getUUID(),
        username: User.getName(),
      }; // create a new feedback object with the text and rating values from the form fields

      if (itemIsEditing.isEditing && itemIsEditing.item) {
        updateItem(itemIsEditing.item.id, newFeedback); // update the item in the list of feedbacks
        showAlert("success", "Review updated successfully!");
      } else {
        addItem(newFeedback); // add the feedback to the list of feedbacks
        showAlert("success", "Review submitted successfully!");
      }
      reset();
      navigate("/dashboard");
    } else {
      showAlert("error", "Error");
    }
  };

  const reset = () => {
    setBody("");
    setTitle("");
    setAuthor("");
    setRating(0);
  };

  const handleCancel = () => {
    cancelEdit();
    reset();
    navigate("/dashboard");
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit} autoComplete="off">
      <h1>{itemIsEditing.isEditing ? "Edit Review" : "Add a Review"}</h1>
      <Input
        label="Book Title"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        minLength={titleMinLength}
        maxLength={50}
        placeholder="e.g Harry Potter and the Goblet of Fire"
        list="titles_list"
        error={`Title must be at least ${titleMinLength} characters long`}
        autoFocus
      />

      <datalist id="titles_list">
        {titlesList.map((title) => (
          <option key={title} value={title} />
        ))}
      </datalist>

      <Input
        label="Author"
        value={author}
        name="author"
        onChange={(e) => setAuthor(e.target.value)}
        minLength={authorMinLength}
        maxLength={40}
        placeholder="e.g J.K. Rowling"
        list="authors_list"
        error={`Author must be at least ${authorMinLength} characters long`}
      />

      <datalist id="authors_list">
        {authorsList.map((author) => (
          <option key={author} value={author} />
        ))}
      </datalist>

      <div className="input-group">
        <label htmlFor="body">
          Your Review
          <span aria-label="Characters left" className="character-count">
            {2000 - body.length}/2000
          </span>
        </label>

        <textarea
          name="body"
          placeholder="What did you think about the book?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
        />
      </div>

      <RatingSelector select={(rating) => setRating(rating)} />
      {/* pass the selected rating to the RatingSelector component */}
      <div className="btn-container">
        {itemIsEditing.isEditing && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </button>
        )}
        <button className="btn btn-primary" type="submit">
          {itemIsEditing.isEditing ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
