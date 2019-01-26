/* Creating the Sort Component to sort results */
import React from "react";
import Button from "../components/Button";
import PropTypes from "prop-types";

const Sort = ({ onSort, sortKey, children, activeSortKey }) => {
  
  const sortClass = ["sort-btn"]
  sortKey === activeSortKey && sortClass.push("sort-btn-active");

  return (
    <Button
      type = "button"
      className = {sortClass.join(" ")}
      onClick = {() => {onSort(sortKey)}}
    >
      {children}
    </Button>
  )
}
// Checking the Sort Props type
Sort.propTypes = {
  onSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Sort;
