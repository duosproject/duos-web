import React, { Component } from "react";
import ValidationField from "./ValidationField";

export default class ValidationForm extends Component {
  constructor(props) {
    super(props);

    // setting state from props
    // because question labels were born in the server
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

  handleChange(e, formElement) {
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
    const [firstName] = this.props.authorName.split(" ");
    return (
      <form className="column box is-full has-background-clear">
        {this.state.progress ===
        Object.keys(this.state.userResponses).length ? (
          <div className="notification is-success">
            Thank you for taking the time to complete this survey, {firstName}.
            <br />
            Your contribution will make a great impact in our research.
          </div>
        ) : (
          <progress
            className="progress is-primary"
            value={this.state.progress}
            max={Object.keys(this.state.userResponses).length}
          />
        )}
        {this.props.datasets.map(({ name, id }) => (
          <ValidationField
            label={name}
            key={id}
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
