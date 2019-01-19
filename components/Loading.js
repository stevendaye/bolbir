/* Creating a Loading component */
import React from "react";

const Loading = ({ error }) =>
  <div className = { error? "hide" : "loading"}>
    Loading...
  </div>

export default Loading;
