/* List Table Styles */
import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const Table = ({ list, onDismiss }) => (
  <div className = "search-result">

      <div className = "sort-points">...</div>
      <div className = "clear"></div>

    {list.map( item =>
      <section key = {item.objectID} style = { (!item.title || !item.url) ? {display: "none"} : {display: "block"}}>
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

// Checking the types of the Table props
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
  onDismiss: PropTypes.func.isRequired
};

export default Table;