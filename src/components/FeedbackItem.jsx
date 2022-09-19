import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import AlertContext from "../context/AlertContext";

function FeedbackItem({ item }) {
  const { deleteItem, editItem } = useContext(FeedbackContext);
  const { showAlert } = useContext(AlertContext);

  const handleDelete = () => {
    deleteItem(item.id);
    showAlert("error", "Item deleted successfully");
  };

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      {/* <button className="btn-icon btn-delete" onClick={handleDelete}>
        <FaTimes />
      </button> */}
      {/* <button className="btn-icon btn-edit" onClick={() => editItem(item)}>
        <FaEdit />
      </button> */}
      <h2>{item.title}</h2>
      <span>by {item.author}</span>
      <div className="text-display">
        <p>{item.body}</p>
      </div>
      <div className="name-display">- {item.username}</div>
    </Card>
  );
}

export default FeedbackItem;
