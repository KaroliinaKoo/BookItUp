import React from "react";
import PropTypes from "prop-types";

function Card({ children }) {
  // children is a prop that is passed in from the parent component (e.g. FeedbackItem) and is displayed inside of the Card component
  return <div className={`card`}>{children}</div>; //use the reverse style, if reverse-prop is passed as "true"
}

export default Card;

Card.propTypes = {
  children: PropTypes.node.isRequired,
};
