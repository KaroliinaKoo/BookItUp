import React, { useEffect, useState, useContext } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelector from "./RatingSelector";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(undefined);
  const [username, setUsername] = useState("");

  const [showTextError, setShowTextError] = useState(false);
  const [showRatingError, setShowRatingError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);

  const [alert, setAlert] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const VALIDATION = {
    text: {
      required: true,
      minLength: 10,
      errorMsg: "Please enter a feedback message of at least 10 characters",
    },
    username: {
      required: true,
      minLength: 3,
      errorMsg: "Please enter a username of at least 3 characters",
    },
    rating: {
      required: true,
      errorMsg: "Please select a rating",
    },
  };

  const { addItem, itemToBeEdited } = useContext(FeedbackContext);

  useEffect(() => {
    if (itemToBeEdited.isEditing) {
      setText(itemToBeEdited.item.text);
      setRating(itemToBeEdited.item.rating);
      setUsername(itemToBeEdited.item.username);
    }
  }, [itemToBeEdited]);

  useEffect(() => {
    if (text !== "" && text.trim().length < VALIDATION.text.minLength) {
      setShowTextError(true);
    } else {
      setShowTextError(false);
    }
    if (
      username !== "" &&
      username.trim().length < VALIDATION.username.minLength
    ) {
      setShowUsernameError(true);
    } else {
      setShowUsernameError(false);
    }

    if (rating === undefined) {
      setShowRatingError(true);
    } else if (rating !== undefined) {
      setShowRatingError(false);
    }
    if (
      text.trim().length >= VALIDATION.text.minLength &&
      username.trim().length >= VALIDATION.username.minLength &&
      rating !== undefined
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [text, username, rating]);

  const handleInput = ({ target: { value, id } }) => {
    if (id === "text") {
      setText(value);
    } else if (id === "username") {
      setUsername(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      text.trim().length >= VALIDATION.text.minLength &&
      username.trim().length >= VALIDATION.username.minLength &&
      rating
    ) {
      const newFeedback = { text, rating, username }; // create a new feedback object with the text and rating values from the form fields
      addItem(newFeedback); // add the feedback to the list of feedbacks
      setIsSubmitting(true);
      reset();
    } else {
      setAlert("Please fill out all fields.");
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
    setSubmitDisabled(true);
  };

  return (
    <Card>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2>How did we do? Give us a rating:</h2>
        <RatingSelector select={(rating) => setRating(rating)} />
        {/* pass the selected rating to the RatingSelector component */}
        <div className="input-group">
          <input
            id="text"
            type="text"
            name="rating"
            placeholder="Write a review"
            value={text} // value of text input is set to the value of the text state
            onChange={handleInput} // set the text state to the value of the text input
          />
        </div>
        <div className="input-group">
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Your name"
            value={username}
            onChange={handleInput}
          />
        </div>
        <Button type="submit" isDisabled={submitDisabled}>
          Submit
        </Button>
        {alert && <div className="alert">{alert}</div>}
        {isSubmitting && (
          <div className="alert fade-out">Thank you for your feedback!</div>
        )}
        {showTextError && (
          <div className="alert">{VALIDATION.text.errorMsg}</div>
        )}
        {showRatingError && (
          <div className="alert">{VALIDATION.rating.errorMsg}</div>
        )}
        {showUsernameError && (
          <div className="alert">{VALIDATION.username.errorMsg}</div>
        )}
      </form>
    </Card>
  );
}

export default FeedbackForm;
