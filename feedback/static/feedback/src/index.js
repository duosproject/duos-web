import React, { Component } from "react";
import ReactDOM from "react-dom";

const App = props => (
  <div>
    <h1>{props.hey}</h1>
  </div>
);

ReactDOM.render(
  React.createElement(App, window.props), // get the props that are passed in the template
  window.root
);
