/* List Table Styles */
import React from "react";
import Button from "./Button";

const Table = ({ list, onDismiss }) => (
  <div className = "search-result">

      <div className = "sort-points">...</div>
      <div className = "clear"></div>

    {list.map( item =>
      <section key = {item.objectID}>
        <h3><a href= {item.url}>{item.title}</a></h3>
        <div className = "clear"></div>
        <i>{item.author}</i>
        <p><a href= {item.url}>{item.url}</a></p>
        <hr/>
        <p>{item.title}</p>
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

export default Table;