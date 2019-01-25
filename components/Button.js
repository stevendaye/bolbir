/*#### Button Component #### */
import React from "react";
import PropTypes from "prop-types";

const Button = ({ className, onClick, children, type }) =>
  <button
    type = {type}
    className = {className}
    onClick = {onClick}
  >
    {children}
  </button>

// Checking Button Props type
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired
};
Button.defaultProps = {
  className: ""
};

export default Button;
