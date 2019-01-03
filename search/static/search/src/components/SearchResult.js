import React from "react";

export default function SearchResult(props) {
  return (
    <div className="container content">
      <h3 className="is-size-6">
        {props.data.articleName} by {props.data.authorName}
      </h3>
      <p>{props.data.datasetName}</p>
      <br />
    </div>
  );
}
