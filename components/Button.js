/*#### Button Component #### */
import React from "react";

const Button = ({ className = "", onClick, children }) =>
  <button
    className = {className}
    onClick = {onClick}
    type = "button"
  >
    {children}
  </button>

export default Button;
