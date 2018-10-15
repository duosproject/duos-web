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
        <form>
          <fieldset>
            {this.props.datasets.map(x => (
              <Field label={x} onChange={this.handleChange} />
            ))}
          </fieldset>
        </form>
      </div>
    );
  }
}

function Field(props) {
  const answers = ["Yes", "No", "Needs clarificaiton", "Unsure"];

  return (
    <div className="field buttons has-addons">
      <label className="label">{props.label}</label>
      {answers.map(x => (
        <input
          onClick={e => props.onChange(e)}
          type="button"
          className="button"
          value={x}
        />
      ))}
    </div>
  );
}

ReactDOM.render(<App {...window.props} />, window.root);
