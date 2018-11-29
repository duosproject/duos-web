import React from "react";
import ValidationForm from "./ValidationForm";

export default function App(props) {
  return (
    <div id="app" className="columns is-multiline content">
      <h2 className="title column is-full">
        <span>{props.articleName}</span> <br />
        <span className="is-size-5">by {props.authorName}</span>
      </h2>
      <article className="subtitle column is-full">
        Were the following datasets referenced in the paper mentioned above?
        Your answers are submitted automatically.
      </article>
      <ValidationForm {...props} />
    </div>
  );
}
