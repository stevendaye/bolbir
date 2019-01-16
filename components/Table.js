/* List Table Styles */
import React from "react";
import Button from "./Button";

const Table = ({ list, pattern, onRemove, isSearched }) => (
  <div className = "search-result">

      <div className = "sort-points">...</div>
      <div className = "clear"></div>

    {list.filter(isSearched(pattern)).map( item => 
      <section key = {item.objectID}>
        <h3><a href= {item.url}>{item.title}</a></h3>
        <p><a href= {item.url}>{item.url}</a></p>
        <hr/>
        <p>{item.head}</p>
        <span>Author: {item.author}</span>
        <span>Comments: {item.num_comments}</span>
        <span>Points: {item.points}</span>                                       
        <Button
          className = "rm-btn"
          onClick = {() => {onRemove(item.objectID)}}
        >
          Remove
        </Button>
        <span className = "search-opt">...</span>
      </section>
    )}
  </div>
);

export default Table;