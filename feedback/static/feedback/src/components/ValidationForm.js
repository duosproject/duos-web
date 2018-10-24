import React, { Component } from "react";
import ValidationField from "./ValidationField";

export default class ValidationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: {},
      paper: "",
      author: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // MAYBE: fetch pre-existing answers?
    // make the list of datasets into an object with titles as keys
    this.setState({
      responses: this.props.datasets
        .map(({ name }) => ({
          [name]: { userSelection: "", clarification: "" }
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    });
  }

  handleChange(e, formElemName) {
    e.preventDefault();
    const name = formElemName;
    const value = e.target.value;
    const input =
      e.target.type === "textarea"
        ? { clarification: value }
        : { userSelection: value };
    this.setState(state => ({
      responses: {
        ...state.responses,
        [name]: { ...state.responses[name], ...input }
      }
    }));
  }

  render() {
    return (
      <div>
        <form className="container">
          <fieldset>
            {this.props.datasets.map(({ name, contexts }) => (
              <ValidationField
                label={name}
                key={name} // TODO: better key
                onChange={e => this.handleChange(e, name)}
                contexts={contexts}
                clicked={{ ...this.state.responses[name] }}
              />
            ))}
          </fieldset>
        </form>
      </div>
    );
  }
}
