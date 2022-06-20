import Card from "./shared/Card";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

function FeedbackItem({ item, handleDelete }) {
  return (
    <Card reverse={false}>
      <div className="num-display">{item.rating}/10</div>
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
