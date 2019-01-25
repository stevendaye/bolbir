/* ## Search Component ## */
import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const Search = ({ value, onChange, placeholder, type, onSubmit, onClick, children }) =>
  <div className = "search-box-wrapper">
    <form onSubmit = {onSubmit} >
      <input
        className = "search-box"
        value= {value}
        type = {type}
        placeholder = {placeholder}
        onChange = {onChange}
      />
      <Button
        type = "submit"
        className = "search-button"
        onClick = {onClick}
      >
        {children}
      </Button>
    </form>
  </div>

// Checking Search Props type;
Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};
export default Search;