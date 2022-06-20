import React from "react";
import PropTypes from "prop-types";

function Button({ children, version, type, isDisabled, onClick }) {
  // children = the text inside the button (e.g. "Submit")
  // version = the type of button (e.g. "primary")
  // type = the type of button (e.g. "submit")
  // isDisabled = a boolean that is true if the button is disabled and false if it is not
  // onClick = the function that is called when the button is clicked

  return (
    <button
      type={type}
      className={`btn btn-${version}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
