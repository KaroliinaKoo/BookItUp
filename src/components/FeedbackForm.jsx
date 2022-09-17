import React, { useEffect, useState, useContext } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelector from "./RatingSelector";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [rating, setRating] = useState(undefined);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const textMinLength = 10;
  const titleMinLength = 3;
  const ratingRegex = /^([1-9]|10)$/;

  const { addItem, updateItem, itemIsEditing } = useContext(FeedbackContext);

  useEffect(() => {
    if (itemIsEditing.isEditing) {
      setText(itemIsEditing.item.text);
      setRating(itemIsEditing.item.rating);
      setBookTitle(itemIsEditing.item.bookTitle);
    }
  }, [itemIsEditing]);

  useEffect(() => {
    setSubmitDisabled(false);
    setErrorMsg("");

    if (rating === undefined) {
      setErrorMsg("Please select a rating between 1-10");
      setSubmitDisabled(true);
    }

    if (text.replace(/\s+/g, "").length < textMinLength) {
      setErrorMsg("Review must be at least 10 characters long");
      setSubmitDisabled(true);
    }

    if (bookTitle.replace(/\s+/g, "").length < titleMinLength) {
      setErrorMsg("Title must be at least 3 characters long");
      setSubmitDisabled(true);
    }

    if (bookTitle === "" && text === "" && rating === undefined) {
      setErrorMsg("");
    }
  }, [text, bookTitle, rating]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      text.replace(/\s+/g, "").length >= textMinLength &&
      bookTitle.replace(/\s+/g, "").length >= titleMinLength &&
      ratingRegex.test(rating)
    ) {
      console.log("creating new feedback");
      const newFeedback = {
        text,
        bookTitle,
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
    setBookTitle("");
    setRating(undefined);
    setErrorMsg("");
    console.log("form reset");
  };

  return (
    <Card>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h1>Rate a Book</h1>
        <div className="input-group">
          <label htmlFor="book-title">Title of the Book</label>
          <input
            type="text"
            name="book-title"
            placeholder='e.g "Lord of the Rings"'
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="text-body">Review</label>
          <textarea
            name="text-body"
            placeholder="What did you think about the book?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <RatingSelector select={(rating) => setRating(rating)} />
        {/* pass the selected rating to the RatingSelector component */}

        {isSubmitting && (
          <div className="alert fade-out">Thank you for your review!</div>
        )}
        <div className="alert">{errorMsg}</div>
        <Button type="submit" isDisabled={submitDisabled}>
          {itemIsEditing.isEditing ? "Update" : "Submit"}
        </Button>
      </form>
    </Card>
  );
}

export default FeedbackForm;
