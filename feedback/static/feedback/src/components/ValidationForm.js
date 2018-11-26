import React, { Component } from "react";
import ValidationField from "./ValidationField";

export default class ValidationForm extends Component {
  constructor(props) {
    super(props);

    // state mirrors props because they come from the server
    this.state = {
      userResponses: this.props.datasets
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

  handleChange(e, formElement) {
    console.log(formElement);
    e.preventDefault();

    const value = e.target.value;
    const input =
      e.target.type === "textarea"
        ? { clarification: value }
        : { selection: value };

    this.setState(state => ({
      userResponses: {
        ...state.userResponses, // hold onto responses to other questions
        [formElement]: { ...state.userResponses[formElement], ...input }
      },
      progress:
        Object.keys(state.userResponses).filter(
          key => state.userResponses[key].selection != "" && key != formElement
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
        {this.props.datasets.map(({ name, id }) => (
          <ValidationField
            label={name}
            key={id} // TODO: better key
            datasetId={id}
            onChange={e => this.handleChange(e, name)}
            userResponse={this.state.userResponses[name]}
            {...this.props}
          />
        ))}
      </form>
    );
  }
}
