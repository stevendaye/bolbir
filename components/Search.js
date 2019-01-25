/* ## Search Component ## */
import React from "react";
import Button from "./Button";

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

export default Search;