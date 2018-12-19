import React, { Component } from "react";
import SearchBar from "./SearchBar";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="app" className="columns is-multiline is-mobile content">
        <article className="column is-full">
          Browse the datasets and articles collected by the DUOS web crawler.
        </article>
        <SearchBar onChange={this.handleChange} />
      </div>
    );
  }
}
