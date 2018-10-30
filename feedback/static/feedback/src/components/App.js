import React, { Component } from "react";
import ValidationForm from "./ValidationForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { formComplete: false };

    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(flag) {
    this.setState({ formComplete: flag });
  }

  render() {
    const firstName = this.props.authorName.split(" ")[0];

    return this.state.formComplete ? (
      <div className="notification is-success">
        Thank you for taking the time to complete this survey, {firstName}. Your
        contribution will make a great impact in our research.
      </div>
    ) : (
      <div id="app" className="columns is-multiline content">
        <h2 className="title column is-full">
          {props.articleName} by {props.authorName}
        </h2>
        <article className="subtitle column is-full">
          In regards to the above, please verify whether the following datasets
          were utilized. If clarifiction is needed, please select that option
          and explain in the text box.
        </article>
        <ValidationForm {...this.props} handleComplete={this.handleComplete} />
      </div>
    );
  }
}
