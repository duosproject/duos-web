import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import SearchResult from "./SearchResult";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: "",
      searchResults: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickToSearch = this.handleClickToSearch.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  handleSearch(e) {
    e.preventDefault();

    if (e.type === "click" || (e.type === "keyup" && e.keyCode === 13)) {
      fetch(`${window.location.href}?q=${this.state.searchQuery}`, {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=utf-8" },
      })
        .then(res =>
          res.ok ? res.json() : new Error("Error fetching search results :("),
        )
        .then(json => this.setState({ searchResults: json }));
    }
  }

  handleClickToSearch(e) {
    e.preventDefault();

    const searchQuery = e.target.innerText;

    this.setState({ searchQuery });
    this.handleSearch(e);
  }

  render() {
    return (
      <div id="app" className="columns is-multiline is-mobile content">
        <article className="column is-full">
          Browse the datasets and articles collected by the DUOS web crawler.
          <span className="has-text-weight-bold help">
            Tip: you can use the * wildcard to search for partial terms.
          </span>
        </article>
        <div className="column is-full box">
          <SearchBar
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            value={this.state.searchQuery}
          />
          {"resultList" in this.state.searchResults && (
            <SearchResultList
              resultData={this.state.searchResults}
              onClick={this.handleClickToSearch}
            />
          )}
        </div>
      </div>
    );
  }
}
