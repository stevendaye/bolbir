/* List Table Styles */
import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import Sort from "../components/Sort";
import { sortBy } from "lodash";

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
}

const Table = ({list, duplicateKey, onDismiss, sortKey, onSort }) => {

  const sortedList = SORTS[sortKey](list);

  return (
    <div className = "search-result">

        <div className = "sort-points">
          <span className = "sort-name">
            <Sort sortKey = {"TITLE"} onSort = {onSort}>
              Title
            </Sort>
          </span>
          <span className = "sort-name">
            <Sort sortKey = {"AUTHOR"} onSort = {onSort}>
              Author
            </Sort>
          </span>
          <span className = "sort-name">
            <Sort sortKey = {"COMMENTS"} onSort = {onSort}>
              Comments
            </Sort>
          </span>
          <span className = "sort-name">
            <Sort sortKey = {"POINTS"} onSort = {onSort}>
              Points
            </Sort>
          </span>
          ...
        </div>
        <div className = "clear"></div>

      {sortedList.map( item =>
        <section
          key = {item.objectID}
          style = { (!item.title || !item.url || item.objectID === duplicateKey) ? {display: "none"} : {display: "block"}}
        >
          <h3><a href= {item.url}>{item.title}</a></h3>
          <div className = "clear"></div>
          <i>{item.author}</i>
          <p><a href= {item.url}>{item.url}</a></p>
          <hr/>
          <p>{item.title}<a href= {item.url}><em className = "read-more">...Read More...</em></a></p>
          <span>Comments: {item.num_comments}</span>
          <span>Points: {item.points}</span>
          <Button
            type = "button"
            className = "rm-btn"
            onClick = {() => {onDismiss(item.objectID)}}
          >
            Dismiss
          </Button>
          <span className = "search-opt">...</span>
        </section>
      )}
    </div>
  );
}

// Checking Table Props type
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.number.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Table;