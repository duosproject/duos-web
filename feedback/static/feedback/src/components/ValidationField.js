import React, { Component } from "react";

export default class ValidationField extends Component {
  constructor(props) {
    super(props);

    this.USER_DONE_TYPING_TIMEOUT = 3500;
    this.handleUserIsTyping = this.handleUserIsTyping.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { userResponse, datasetId, articleId, authorId, refId } = this.props;
    const { selection, clarification } = userResponse;

    if (
      prevProps.userResponse.selection !== selection ||
      prevProps.userResponse.clarification !== clarification
    ) {
      fetch(window.location.href, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          datasetId,
          selection,
          clarification,
          articleId,
          refId,
          authorId
        })
      });
    }
  }

  handleUserIsTyping(e, callback) {
    e.persist();
    setTimeout(
      () => callback(e, this.props.label),
      this.USER_DONE_TYPING_TIMEOUT
    );
  }

  render() {
    const ANSWERS = [
      { display: "Yes", value: "yes" },
      { display: "No", value: "no" },
      { display: "Let me clarify", value: "clarify" },
      { display: "Unsure", value: "unsure" }
    ];

    return (
      <div className="field columns is-multiline is-centered">
        <div className="column">
          <label className="label">{this.props.label}</label>
        </div>
        {/* template string cuz bulma is weird */}
        <div className={`column buttons has-addons control`}>
          {ANSWERS.map(({ value, display }) => (
            <button
              onClick={e => this.props.onChange(e)}
              className={`button ${
                this.props.userResponse.selection == value
                  ? "is-selected is-primary"
                  : ""
              }`}
              value={value}
              name={value}
              key={this.props.datasetId + value}
            >
              {display}
            </button>
          ))}
        </div>
        {this.props.userResponse.selection == "clarify" && (
          <div className="control column is-full">
            <textarea
              rows={4}
              cols={90}
              placeholder={`Briefly explain your use of ${
                this.props.label
              } here.`}
              onChange={e => this.handleUserIsTyping(e, this.props.onChange)}
              className="textarea"
            />
          </div>
        )}
      </div>
    );
  }
}
