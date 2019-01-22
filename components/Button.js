/*#### Button Component #### */
import React from "react";

const Button = ({ className = "", onClick, children, type }) =>
  <button
    type = {type}
    className = {className}
    onClick = {onClick}
  >
    {children}
  </button>

export default Button;
