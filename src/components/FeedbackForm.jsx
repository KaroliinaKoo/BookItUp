import React from "react";
import { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelector from "./RatingSelector";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [alert, setAlert] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    if (text.trim().length > 10) {
      const newFeedback = { text, rating }; // create a new feedback object with the text and rating values from the form fields
      setAlert("Thank you for your feedback!");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Leave Feedback</h2>
        <RatingSelector />
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
      </form>
    </Card>
  );
}

export default FeedbackForm;
