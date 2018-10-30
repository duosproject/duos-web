import React, { Component } from "react";

export default class ValidationField extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clicked.userSelection !== this.props.clicked.userSelection) {
      fetch(window.location.href, { method: "POST" });
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
        <div className={`column buttons has-addons control`}>
          {ANSWERS.map(({ value, display }) => (
            <button // TODO: add key, add name
              onClick={e => this.props.onChange(e, value)}
              className={`button ${
                this.props.clicked == value ? "is-selected is-primary" : ""
              }`}
              value={value}
              name={value}
              key={this.props.label + value} // TODO: better key
            >
              {display}
            </button>
          ))}
        </div>
        {this.props.clicked == "clarify" && (
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
