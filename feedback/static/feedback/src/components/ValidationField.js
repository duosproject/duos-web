import React, { Component } from "react";

export default class ValidationField extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    const { userResponse, datasetId, articleId, authorId, refId } = this.props;
    const { selection, clarification } = userResponse;

    if (prevProps.userResponse.selection !== selection) {
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
            <button // TODO: add key, add name
              onClick={e => this.props.onChange(e, value)}
              className={`button ${
                this.props.userResponse.selection == value
                  ? "is-selected is-primary"
                  : ""
              }`}
              value={value}
              name={value}
              key={this.props.label + value} // TODO: better key
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
              onChange={e => this.props.onChange(e, this.props.label)}
              className="textarea "
            />
          </div>
        )}
      </div>
    );
  }
}
