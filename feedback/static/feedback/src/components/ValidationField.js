import React from "react";

export default function ValidationField(props) {
  const ANSWERS = [
    { display: "Yes", value: "yes" },
    { display: "No", value: "no" },
    { display: "Needs clarificaiton", value: "clarify" },
    { display: "Unsure", value: "unsure" }
  ];

  const selected = {
    backgroundColor: "#EC6D05",
    color: "#FFFFEE",
    height: "100px"
  };

  return (
    <div className="level">
      <div className="level-left">
        <label className="label level-item">{props.label}</label>
      </div>
      <div className="level-right buttons has-addons">
        {ANSWERS.map(({ value, display }) => (
          <button // TODO: add key, add name
            onClick={e => props.onChange(e, value)}
            className="button"
            value={value}
            name={value}
            key={props.label + value} // TODO: better key
            style={props.clicked.userSelection == value ? { ...selected } : {}}
          >
            {display}
          </button>
        ))}
      </div>
      {props.clicked.userSelection == "clarify" && (
        <textarea
          rows={4}
          cols={90}
          placeholder={`Briefly explain your use of ${props.label} here.`}
          onChange={e => props.onChange(e, props.label)}
        />
      )}
    </div>
  );
}
