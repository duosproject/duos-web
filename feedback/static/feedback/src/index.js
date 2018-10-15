import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

function App(props) {
  return (
    <div>
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
        <h2 className="title">
          {this.props.articleName} by {this.props.authorName}
        </h2>
        <article className="subtitle">
          In regards to the above, please verify whether the following datasets
          were utilized. If clarifiction is needed, please select that option
          and explain in the text box.
        </article>
        <form>
          <fieldset>
            {this.props.datasets.map(x => (
              <Field label={x} />
            ))}
          </fieldset>
        </form>
      </div>
    );
  }
}

function Field(props) {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <input type="button" className="button" value="Yes" selected="true" />
      <input type="button" className="button" value="No" />
      <input type="button" className="button" value="Needs clarificaiton" />
      <input type="button" className="button" value="Unsure" />
    </div>
  );
}

ReactDOM.render(<App {...window.props} />, window.root);
