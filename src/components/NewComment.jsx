import User from "../modules/user";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function NewComment({ showForm, setShowForm }) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState(User.getName());

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: uuidv4(),
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
              <label htmlFor="comment">Comment</label>
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
