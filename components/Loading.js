/* Creating a Loading component */
import React from "react";
import PropTypes from "prop-types";

const Loading = ({ error }) =>
  <div className = { error? "hide" : "loading"}>
    Loading...
  </div>

// Checking Loading Props type;
Loading.propTypes = {
  error: PropTypes.bool.isRequired
};

export default Loading;
