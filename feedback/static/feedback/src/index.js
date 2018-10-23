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
              <Field
                label={name}
                onChange={e => this.handleChange(e, name)}
                contexts={contexts}
                clicked={{ ...this.state.responses[name] }}
              /> // TODO: add key
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
        {ANSWERS.map(({ value, display }) => (
          <button // TODO: add key, add name
            onClick={e => props.onChange(e, value)}
            className="button"
            value={value}
            name={value}
            style={
              props.clicked.userSelection == value
                ? { backgroundColor: "#EC6D05", color: "#FFFFEE" }
                : {}
            }
          >
            {display}
          </button>
        ))}
      </div>
      {props.clicked.userSelection == "unsure" && (
        <textarea
          rows={4}
          cols={90}
          placeholder={`Briefly explain your use of ${props.label} here.`}
          onChange={e => props.onChange(e, props.label)}
        />
      )}
    </div>
  );
}

ReactDOM.render(<App {...window.props} />, window.root);
