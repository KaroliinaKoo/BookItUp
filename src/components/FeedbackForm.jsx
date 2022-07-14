import React, { useEffect, useState, useContext } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelector from "./RatingSelector";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const textMinLength = 10;
  const usernameMinLength = 3;
  const ratingRegex = /^([1-9]|10)$/;

  const { addItem, updateItem, itemIsEditing } = useContext(FeedbackContext);

  useEffect(() => {
    if (itemIsEditing.isEditing) {
      setText(itemIsEditing.item.text);
      setRating(itemIsEditing.item.rating);
      setUsername(itemIsEditing.item.username);
    }
  }, [itemIsEditing]);

  useEffect(() => {
    setSubmitDisabled(false);
    setErrorMsg("");

    if (username.replace(/\s+/g, "").length < usernameMinLength) {
      setErrorMsg("Username must be at least 3 characters long");
      setSubmitDisabled(true);
    }

    if (text.replace(/\s+/g, "").length < textMinLength) {
      setErrorMsg("Text must be at least 10 characters long");
      setSubmitDisabled(true);
    }

    if (username === "" && text === "") {
      setErrorMsg("");
    }
  }, [text, username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      text.replace(/\s+/g, "").length >= textMinLength &&
      username.replace(/\s+/g, "").length >= usernameMinLength &&
      ratingRegex.test(rating)
    ) {
      console.log("creating new feedback");
      const newFeedback = {
        text,
        username,
        rating,
      }; // create a new feedback object with the text and rating values from the form fields
      if (itemIsEditing.isEditing) {
        updateItem(itemIsEditing.item.id, newFeedback); // update the item in the list of feedbacks
        reset();
      } else {
        addItem(newFeedback); // add the feedback to the list of feedbacks
        setIsSubmitting(true);
        reset();
      }
    } else {
      console.log("Form is not valid");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // set a timeout to hide the message after 4 seconds
      setIsSubmitting(false); // set isSubmitting to false after the feedback has been submitted
    }, 4000);
    return () => clearTimeout(timeout); // clear the timeout when the component unmounts
  }, [isSubmitting]);

  const reset = () => {
    setText("");
    setUsername("");
    setRating(5);
    setErrorMsg("");
    console.log("form reset");
  };

  return (
    <Card>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>How did we do? Give us a rating:</h2>
        <RatingSelector select={(rating) => setRating(rating)} />
        {/* pass the selected rating to the RatingSelector component */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Tell us your feedback"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Button type="submit" isDisabled={submitDisabled}>
          {itemIsEditing.isEditing ? "Update" : "Submit"}
        </Button>
        {isSubmitting && (
          <div className="alert fade-out">Thank you for your feedback!</div>
        )}
        <div className="alert">{errorMsg}</div>
      </form>
    </Card>
  );
}

export default FeedbackForm;
