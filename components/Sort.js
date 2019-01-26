/* Creating the Sort Component to sort results */
import React from "react";
import Button from "../components/Button";
import PropTypes from "prop-types";
import classNames from "classnames";

const Sort = ({ onSort, sortKey, children, activeSortKey }) => {
  
  const sortClass = classNames(
    "sort-btn",
    {"sort-btn-active": sortKey === activeSortKey} 
  );

  return (
    <Button
      type = "button"
      className = {sortClass}
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
