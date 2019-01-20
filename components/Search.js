/* ## Search Component ## */
import React from "react";
import Button from "./Button";

const Search = ({ value, onChange, placeholder, type, onSearchSubmit, children }) =>
  <div className = "search-box-wrapper">
    <form>
      <input
        className = "search-box"
        value= {value}
        type = {type}
        placeholder = {placeholder}
        onChange = {onChange}
      />
      <Button
        className = "search-button"
        onClick = {onSearchSubmit}
      >
        {children}
      </Button>
    </form>
  </div>

export default Search;