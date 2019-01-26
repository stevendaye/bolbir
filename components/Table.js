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

class Table extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      sortKey: "NONE",
      isSortReverse: false,
    }

    this.onSort = this.onSort.bind(this);
  }

  onSort (sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render () {
    const {
      sortKey,
      isSortReverse
    } = this.state;

    const {
      list,
      onDismiss
    } = this.props;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList

    return (
      <div className = "search-result">

        <div className = "sort-points">
          <span className = "sort-name">
            <Sort sortKey = {"TITLE"} onSort = {this.onSort} activeSortKey = {sortKey}>
              Title
            </Sort>
          </span>
          <span className = "sort-name">
            <Sort sortKey = {"AUTHOR"} onSort = {this.onSort} activeSortKey = {sortKey}>
              Author
            </Sort>
          </span>
          <span className = "sort-name">
            <Sort sortKey = {"COMMENTS"} onSort = {this.onSort} activeSortKey = {sortKey}>
              Comments
            </Sort>
          </span>
          <span className = "sort-name">
            <Sort sortKey = {"POINTS"} onSort = {this.onSort} activeSortKey = {sortKey}>
              Points
            </Sort>
          </span>
          ...
        </div>
        <div className = "clear"></div>

        {reverseSortedList.map( item =>
          <section
            key = {item.objectID}
            style = { (!item.title || !item.url) ? {display: "none"} : {display: "block"}}
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
  onDismiss: PropTypes.func.isRequired
};

export default Table;