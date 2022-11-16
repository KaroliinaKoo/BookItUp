import User from "../modules/user";
import { useState } from "react";
import React from "react";
import { getUUID } from "../utils/uuid";

type PropTypes = {
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
};

function NewComment({ showForm, setShowForm }: PropTypes) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState(User.getName());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      id: getUUID(),
      comment: comment,
      username: username,
    };
    console.log(newComment);
    setComment("");
    setUsername("");
  };

  return (
    <div className="add-comment">
      {showForm && (
        <div className="new-comment">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="comment">Add a Comment</label>
              <textarea
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="toggle btn-secondary small"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="submit btn-primary small" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewComment;
