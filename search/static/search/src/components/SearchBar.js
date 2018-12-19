import React from "react";

export default function SearchBar(props) {
  return (
    <div className="column is-full box">
      <div className="field has-addons">
        <span className="control is-expanded">
          <input
            className="input "
            id="search-bar"
            type="text"
            placeholder="Look up articles and datasets"
            name="searchQuery"
            autoFocus={true}
            onChange={props.onChange}
          />
        </span>
        <span className="control">
          <button className="button" id="search-button" value="ok">
            Search
          </button>
        </span>
      </div>
    </div>
  );
}
