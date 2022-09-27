import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";

function MyReviewItem({ item, showForm, setShowForm }) {
  const { deleteItem, editItem } = useContext(FeedbackContext);
  const { showAlert } = useContext(AlertContext);

  const handleDelete = () => {
    deleteItem(item.id);
    showAlert("error", "Item deleted successfully");
  };

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <div className="user-tools">
        <button onClick={handleDelete}>
          <FaTimes className="btn-icon" /> Delete Review
        </button>
        <button
          onClick={() => {
            setShowForm(!showForm);
            editItem(item);
          }}
        >
          <FaEdit className="btn-icon" /> Edit Review
        </button>
      </div>
      <h2>{item.title}</h2>
      <span>by {item.author}</span>
      <div className="text-display">
        <p>{item.body}</p>
      </div>
    </Card>
  );
}

export default MyReviewItem;
