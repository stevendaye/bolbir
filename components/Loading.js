/* Creating a Loading component */
import React from "react";
import PropTypes from "prop-types";

const Loading = ({ error, isLoadingMore }) =>
  <div className = { error ? "hide" : (isLoadingMore ? "loading-more" : "loading")}>
    Loading...
  </div>

// Checking Loading Props type;
Loading.propTypes = {
  error: PropTypes.bool
};

export default Loading;
