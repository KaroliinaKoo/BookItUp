import React from "react";
import { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Card>
      <form>
        <h2>Leave Feedback</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text} // value of text input is set to the value of the text state
            onChange={handleTextChange}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Card>
  );
}

export default FeedbackForm;
