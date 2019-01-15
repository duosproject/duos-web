import React from "react";

export default function SearchResult(props) {
  return (
    <div className="container content">
      <h3 className="is-size-6">{props.data.articleName}</h3>
      Authors:
      <ul>
        {props.data.authorName.map(a => (
          <li>{a}</li>
        ))}
      </ul>
      Datasets:
      <ul>
        {props.data.datasetName.map(a => (
          <li>{a}</li>
        ))}
      </ul>
      <br />
    </div>
  );
}
