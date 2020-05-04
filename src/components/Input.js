import React from 'react';


const Input = props => (
  <div className="input-component">
    <label htmlFor={props.id}>{props.label}</label>
    <div className="horizontal-container">
      <textarea
        id={props.id}
        className="input"
        value={props.value}
        onChange={props.onChange}
        placeholder="Please enter text&hellip;"
      />
      <input
        type="reset"
        value="Clear"
        onClick={props.onClear}
      />
    </div>
  </div>
);

export default Input;
