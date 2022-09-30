import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";

function ReviewItem({ item, profileView }) {
  const { deleteItem, editItem } = useContext(FeedbackContext);
  const { showAlert } = useContext(AlertContext);

  const handleDelete = () => {
    deleteItem(item.id);
    showAlert("error", "Item deleted successfully");
  };

  return (
    <Card className={profileView ? "profile-view" : ""}>
      <div className="num-display">
        {item.rating}
        <span>/10</span>
      </div>
      <h2>{item.title}</h2>
      <span className="author-display">by {item.author}</span>
      <div className="text-display">
        <p>{item.body}</p>
      </div>
      {!profileView && <div className="name-display">- {item.username}</div>}
      {profileView && (
        <div className="user-tools">
          <button onClick={handleDelete}>
            <FaTimes className="btn-icon" /> Delete Review
          </button>
          <button
            onClick={() => {
              editItem(item);
            }}
          >
            <FaEdit className="btn-icon" /> Edit Review
          </button>
        </div>
      )}
    </Card>
  );
}

export default ReviewItem;
