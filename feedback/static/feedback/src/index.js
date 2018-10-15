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
        <h2>
          {this.props.articleName} by {this.props.authorName}
        </h2>
        <article>
          In regards to the above, please verify whether the following datasets
          were utilized. If clarifiction is needed, please select that option
          and explain in the text box.
        </article>
        <form>
          <fieldset>
            {this.props.datasets.map(x => (
              <Fragment>
                <label>{x}</label>
                <input type="button" value={x} />
                <br />
              </Fragment>
            ))}
          </fieldset>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App {...window.props} />, window.root);
