import React, { Component } from "react";
import ValidationField from "./ValidationField";

export default class ValidationForm extends Component {
  constructor(props) {
    super(props);
    const { authorName, articleName, authorId, articleId, datasets } = props;

    // state mirrors props because they come from the server
    this.state = {
      authorName,
      articleName,
      authorId,
      articleId,
      userResponses: datasets
        .map(({ name }) => ({
          [name]: { selection: "", clarification: "" }
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
      progress: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (this.state.progress === Object.keys(this.state.userResponses).length) {
      this.props.handleComplete(true);
    }
  }

  handleChange(e, formElemName) {
    e.preventDefault();

    const name = formElemName;
    const value = e.target.value;
    const input =
      e.target.type === "textarea"
        ? { clarification: value }
        : { selection: value };

    this.setState(state => ({
      userResponses: {
        ...state.userResponses, // hold onto responses to other questions
        [name]: { ...state.userResponses[name], ...input }
      },
      progress:
        Object.keys(state.userResponses).filter(
          key => state.userResponses[key].selection != "" && key != name
        ).length + 1
    }));
  }

  render() {
    return (
      <form className="column box is-full">
        <progress
          className="progress is-info"
          value={this.state.progress} // count of answers so far
          max={Object.keys(this.state.userResponses).length} // total number of questions
        />
        {this.props.datasets.map(({ name }) => (
          <ValidationField
            label={name}
            key={name} // TODO: better key
            datasetId={name}
            onChange={e => this.handleChange(e, name)}
            userResponse={this.state.userResponses[name]}
            {...this.props}
          />
        ))}
      </form>
    );
  }
}
