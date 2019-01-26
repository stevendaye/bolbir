/* ## Search Component ## */
import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

class Search extends React.Component {
  componentDidMount () {
    this.searchInput && this.searchInput.focus();
  }

  render () {
    const { value, onChange, placeholder, type, onSubmit, onClick, children } = this.props;

    return (
      <div className = "search-box-wrapper">
        <form onSubmit = {onSubmit} >
          <input
            className = "search-box"
            value= {value}
            type = {type}
            placeholder = {placeholder}
            onChange = {onChange}
            ref = {el => this.searchInput = el}
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
    );
  }
}

// Checking Search Props type;
Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};
export default Search;