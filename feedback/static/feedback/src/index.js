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
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <Fragment>
        <p>hey, what's in the form?</p>
        <form>
          <fieldset>
            <input
              type="text"
              name="wonderfulInput"
              placeholder={this.props.name}
              value={this.state.value}
              onChange={e => this.handleChange(e)}
            />
          </fieldset>
        </form>
      </Fragment>
    );
  }
}

ReactDOM.render(<App {...window.props} />, window.root);
