import { FaTimes } from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";

function Card({ children, reverse }) {
  // children is a prop that is passed in from the parent component (e.g. FeedbackItem) and is displayed inside of the Card component
  return <div className={`card ${reverse && "reverse"}`}>{children}</div>; //use the reverse style, if reverse-prop is passed as "true"
}

export default Card;

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};
