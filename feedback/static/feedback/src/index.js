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
      <Fragment>
        <p>hey, what's in the form for {this.props.articleName}</p>
        <form>
          <fieldset>
            <input
              type="text"
              name="wonderfulInput"
              placeholder={this.props.authorName}
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
          <ul>
            {" "}
            {this.props.datasets.map(x => (
              <li>{x}</li>
            ))}
          </ul>
        </form>
      </Fragment>
    );
  }
}

ReactDOM.render(<App {...window.props} />, window.root);
