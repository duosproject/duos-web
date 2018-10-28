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
      responses: datasets
        .map(({ name }) => ({
          [name]: { userSelection: "", clarification: "" }
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    };

    this.handleChange = this.handleChange.bind(this);
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
        ...state.responses, // hold onto responses to other questions
        [name]: { ...state.responses[name], ...input }
      }
    }));
  }

  render() {
    return (
      <div>
        <form className="container">
          <fieldset>
            {this.props.datasets.map(({ name }) => (
              <ValidationField
                label={name}
                key={name} // TODO: better key
                onChange={e => this.handleChange(e, name)}
                clicked={{ ...this.state.responses[name] }}
              />
            ))}
          </fieldset>
        </form>
      </div>
    );
  }
}
