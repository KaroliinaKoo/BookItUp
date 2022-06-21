import React, { useEffect, useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelector from "./RatingSelector";

function FeedbackForm({ handleAddItem }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(undefined);
  const [username, setUsername] = useState("Guest");
  const [alert, setAlert] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = ({ target: { value } }) => {
    // target: { value } = the value of the input field (e.g. "I love React")
    if (value === "") {
      setSubmitDisabled(true);
      setAlert(null);
    } else if (value !== "" && value.trim().length < 10) {
      // if the text is more than 10 characters long
      setSubmitDisabled(true);
      setAlert("Please enter at least 10 characters");
    } else {
      setSubmitDisabled(false);
      setAlert(null);
    }
    setText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback = { text, rating, username }; // create a new feedback object with the text and rating values from the form fields
      handleAddItem(newFeedback); // add the feedback to the list of feedbacks
      setIsSubmitting(true);
      reset();
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
    setUsername("Guest");
    setSubmitDisabled(true);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How did we do? Give us a rating:</h2>
        <RatingSelector select={(rating) => setRating(rating)} />
        {/* pass the selected rating to the RatingSelector component */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text} // value of text input is set to the value of the text state
            onChange={handleTextChange}
          />
          <Button type="submit" isDisabled={submitDisabled}>
            Submit
          </Button>
        </div>
        {alert && <div className="alert">{alert}</div>}
        {isSubmitting && (
          <div className="alert fade-out">Thank you for your feedback!</div>
        )}
      </form>
    </Card>
  );
}

export default FeedbackForm;
