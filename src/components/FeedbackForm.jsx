import React, { useEffect, useState, useContext } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import Input from "./shared/Input";
import RatingSelector from "./RatingSelector";
import FeedbackContext from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";

function FeedbackForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(undefined);
  const navigate = useNavigate();

  const { addItem, updateItem, itemIsEditing } = useContext(FeedbackContext);
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
  const usernameMinLength = 1;
  const ratingRegex = /^([1-9]|10)$/;

  useEffect(() => {
    if (itemIsEditing.isEditing) {
      setTitle(itemIsEditing.item.title);
      setBody(itemIsEditing.item.body);
      setAuthor(itemIsEditing.item.author);
      setUsername(itemIsEditing.item.username);
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      author.replace(/\s+/g, "").length >= authorMinLength &&
      title.replace(/\s+/g, "").length >= titleMinLength &&
      username.replace(/\s+/g, "").length >= usernameMinLength &&
      ratingRegex.test(rating)
    ) {
      const newFeedback = {
        body,
        title,
        author,
        username,
        rating,
      }; // create a new feedback object with the text and rating values from the form fields
      if (itemIsEditing.isEditing) {
        updateItem(itemIsEditing.item.id, newFeedback); // update the item in the list of feedbacks
        reset();
        showAlert("success", "Review updated successfully!");
        navigate("/read-reviews");
      } else {
        addItem(newFeedback); // add the feedback to the list of feedbacks
        reset();
        showAlert("success", "Review submitted successfully!");
        navigate("/read-reviews");
      }
    } else {
      showAlert("error", "Error");
    }
  };

  const reset = () => {
    setBody("");
    setTitle("");
    setAuthor("");
    setUsername("");
    setRating(undefined);
  };

  return (
    <Card>
      <form
        className="feedback-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1>Review a Book</h1>

        <Input
          label="Book Title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          minLength={titleMinLength}
          placeholder="e.g Harry Potter and the Goblet of Fire"
          list="titles_list"
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
          placeholder="e.g J.K. Rowling"
          list="authors_list"
        />

        <datalist id="authors_list">
          {authorsList.map((author) => (
            <option key={author} value={author} />
          ))}
        </datalist>

        <div className="input-group">
          <label htmlFor="body">Your Review</label>
          <textarea
            name="body"
            placeholder="What did you think about the book?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
          />
        </div>

        <RatingSelector select={(rating) => setRating(rating)} />
        {/* pass the selected rating to the RatingSelector component */}

        <Input
          label="Username"
          value={username}
          name="username"
          placeholder="e.g. John Doe"
          minLength={usernameMinLength}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button type="submit">
          {itemIsEditing.isEditing ? "Update" : "Submit"}
        </Button>
      </form>
    </Card>
  );
}

export default FeedbackForm;
