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
          [name]: { userResponse: "" }
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    });
  }

  handleChange(e, formElemName) {
    e.preventDefault();
    const name = formElemName;
    const value = e.target.value;

    this.setState(state => ({
      responses: {
        ...state.responses,
        [name]: { ...state.responses[name], userResponse: value }
      }
    }));
  }

  render() {
    return (
      <div>
        <form className="container">
          <fieldset>
            {this.props.datasets.map(x => (
              <Field
                label={x.name}
                onChange={e => this.handleChange(e, x.name)}
                contexts={x.contexts}
                clicked={{ ...this.state.responses[x.name] }}
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
        {ANSWERS.map(a => (
          <button // TODO: add key, add name
            onClick={e => props.onChange(e, a)}
            className="button"
            value={a.value}
            name={a.value}
            style={
              props.clicked.userResponse == a.value
                ? { backgroundColor: "#EC6D05", color: "#FFFFEE" }
                : {}
            }
          >
            {a.display}
          </button>
        ))}
      </div>
      {/* <ul>
        {props.contexts.map(c => (
          <li> - {c}</li>
        ))}
      </ul> */}
    </div>
  );
}

ReactDOM.render(<App {...window.props} />, window.root);
