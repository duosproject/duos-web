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
      { display: "Needs clarificaiton", value: "clarify" },
      { display: "Unsure", value: "unsure" }
    ];

    const selected = {
      backgroundColor: "#EC6D05",
      color: "#FFFFEE"
    };

    return (
      <div className="level">
        <div className="level-left">
          <label className="label level-item">{this.props.label}</label>
        </div>
        <div className="level-right buttons has-addons">
          {ANSWERS.map(({ value, display }) => (
            <button // TODO: add key, add name
              onClick={e => this.props.onChange(e, value)}
              className="button"
              value={value}
              name={value}
              key={this.props.label + value} // TODO: better key
              style={
                this.props.clicked.userSelection == value ? { ...selected } : {}
              }
            >
              {display}
            </button>
          ))}
        </div>
        {this.props.clicked.userSelection == "clarify" && (
          <textarea
            rows={4}
            cols={90}
            placeholder={`Briefly explain your use of ${
              this.props.label
            } here.`}
            onChange={e => this.props.onChange(e, this.props.label)}
          />
        )}
      </div>
    );
  }
}
