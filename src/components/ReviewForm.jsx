import React, { useEffect, useState, useContext } from "react";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import RatingSelector from "../components/RatingSelector";
import { FeedbackContext } from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import User from "../modules/user";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(undefined);
  const username = User.getName();

  const navigate = useNavigate();

  const { addItem, updateItem, itemIsEditing, cancelEdit } =
    useContext(FeedbackContext);

  const { showAlert } = useContext(AlertContext);

  const authorsList = [
    "J.K. Rowling",
    "George R.R. Martin",
    "Stephen King",
    "Terry Pratchett",
    "Neil Gaiman",
    "Brandon Sanderson",
    "J.R.R. Tolkien",
    "Robert Jordan",
    "Patrick Rothfuss",
    "Tad Williams",
  ];

  const titlesList = [
    "Harry Potter and the Philosopher's Stone",
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban",
    "Harry Potter and the Goblet of Fire",
    "Harry Potter and the Order of the Phoenix",
    "Harry Potter and the Half-Blood Prince",
    "Harry Potter and the Deathly Hallows",
  ];

  const titleMinLength = 1;
  const authorMinLength = 1;
  const ratingRegex = /^([1-9]|10)$/;

  useEffect(() => {
    if (itemIsEditing.isEditing) {
      setTitle(itemIsEditing.item.title);
      setBody(itemIsEditing.item.body);
      setAuthor(itemIsEditing.item.author);
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toISOString().slice(0, 10);

    if (
      author.replace(/\s+/g, "").length >= authorMinLength &&
      title.replace(/\s+/g, "").length >= titleMinLength &&
      ratingRegex.test(rating)
    ) {
      const newFeedback = {
        username,
        title,
        author,
        body,
        rating,
        date,
      }; // create a new feedback object with the text and rating values from the form fields
      if (itemIsEditing.isEditing) {
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
    setRating(undefined);
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
        <Button type="submit">
          {itemIsEditing.isEditing ? "Update Review" : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}

export default ReviewForm;
