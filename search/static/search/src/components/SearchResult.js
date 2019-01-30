import React from "react";

export default function SearchResult(props) {
  return (
    <div className="container content search-result">
      <h3 onClick={props.onClick} className="is-size-6">
        {props.data.articleName}
      </h3>
      Authors:
      <ul>
        {props.data.authors.map(a => (
          <li onClick={props.onClick}>{a}</li>
        ))}
      </ul>
      Datasets:
      <ul>
        {props.data.datasets.map(a => (
          <li onClick={props.onClick}>{a}</li>
        ))}
      </ul>
      <br />
    </div>
  );
}
