import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

function FeedbackItem({ item, handleDelete }) {
  return (
    <Card reverse={false}>
      <div className="num-display">
        {item.rating}
        <p style={{ fontSize: "0.8rem", marginLeft: "1px" }}>/10</p>
      </div>
      <button onClick={() => handleDelete(item.id)} className="close">
        <FaTimes color="red" />
      </button>
      <div className="text-display">{item.body}</div>
      <div className="name-display">- {item.username}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
