import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

function App(props) {
  return (
    <div>
      <h2 className="title">
        {props.articleName} by {props.authorName}
      </h2>
      <article className="subtitle">
        In regards to the above, please verify whether the following datasets
        were utilized. If clarifiction is needed, please select that option and
        explain in the text box.
      </article>
      <Form {...props} />
    </div>
  );
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wonderfulInput: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const target = e.target;
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form className="container">
          <fieldset>
            {this.props.datasets.map(x => (
              <Field label={x} onChange={this.handleChange} /> // TODO: add key
            ))}
          </fieldset>
        </form>
      </div>
    );
  }
}

function Field(props) {
  const ANSWERS = [
    { display: "Yes", value: "yes" },
    { display: "No", value: "no" },
    { display: "Needs clarificaiton", value: "clarify" },
    { display: "Unsure", value: "unsure" }
  ];

  return (
    <div className="level">
      <div className="level-left">
        <label className="label level-item">{props.label}</label>
      </div>
      <div className="level-right buttons has-addons">
        {ANSWERS.map(x => (
          <button // TODO: add key, add name
            onClick={e => props.onChange(e)}
            className="button"
            value={x.value}
            name={x.value}
          >
            {x.display}
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App {...window.props} />, window.root);
