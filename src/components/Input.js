import React from 'react';


const Input = ({ label, value, showLength = true, ...props }) => (
  <div className="input-component">
    <label htmlFor={props.id}>
      {label}
      {
        (showLength)
        && <span className="length">{`(${value?.length || 0})`}</span>
      }
    </label>
    <div className="horizontal-container">
      <textarea
        id={props.id}
        className="input"
        value={value}
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
