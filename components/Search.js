/* ## Search Component ## */
import React from "react";
import Button from "./Button";

const Search = ({ value, onChange, children, placeholder, type }) =>
  <div className = "search-box-wrapper">
    <form>
      <input
        className = "search-box"
        type = {type}
        placeholder = {placeholder}
        value= {value}
        onChange = {onChange}
      />
      <Button
        className = "search-button"
        onClick = ""
      >
        {children}
      </Button>
    </form>
  </div>

export default Search;