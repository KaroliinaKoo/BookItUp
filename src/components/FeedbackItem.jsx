import Card from "./shared/Card";
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackItem({ item }) {
  const { deleteItem } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">
        {item.rating}
        <p style={{ fontSize: "0.8rem", marginLeft: "1px" }}>/10</p>
      </div>
      <button
        className="btn-icon btn-delete"
        onClick={() => deleteItem(item.id)}
      >
        <FaTimes color="red" />
      </button>
      <div className="text-display">{item.text}</div>
      <div className="name-display">- {item.username}</div>
    </Card>
  );
}

export default FeedbackItem;
