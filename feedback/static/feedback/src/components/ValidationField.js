import React, { Component } from "react";

export default class ValidationField extends Component {
  constructor(props) {
    super(props);

    this.USER_DONE_TYPING_TIMEOUT = 3500;
    this.ANSWERS = [
      { display: "Yes", value: "yes" },
      { display: "No", value: "no" },
      { display: "Let me clarify", value: "clarify" },
      { display: "Unsure", value: "unsure" }
    ];
    this.handleUserIsTyping = this.handleUserIsTyping.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { datasetId, articleId, authorId, refId } = this.props;
    const { selection, clarification } = this.props.userResponse;

    if (
      // the user is pressing a different button than last press
      prevProps.userResponse.selection !== selection ||
      // user's typed clarification has changed
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
    return (
      <div className="field columns is-multiline is-centered">
        <div className="column">
          <label className="label">{this.props.label}</label>
        </div>
        {/* template string cuz bulma is weird */}
        <div className={`column buttons has-addons control`}>
          {this.ANSWERS.map(({ value, display }) => (
            <button
              onClick={e => this.props.onChange(e)}
              className={`button ${
                this.props.userResponse.selection == value
                  ? "is-selected is-primary has-text-white-ter"
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
