import React, { useState } from 'react';

import { getRealValue } from '../functions';


const FunctionParamRenderer = props =>
{
  let [ valid, setValid ] = useState(true);

  const handleChange = function(event)
  {
    let value = (event.target.type === 'checkbox')
      ? event.target.checked
      : event.target.value;

    setValid(true);

    try
    {
      value = getRealValue(value, props.type);
    }
    catch (e)
    {
      setValid(false);
    }

    props.onChange
      && props.onChange(value);
  }

  let renderer = <div/>;

  switch (props.type)
  {
    default:
    case 'number':
      renderer = <input
        type="number"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={handleChange}
      />;
      break;

    case 'boolean':
      renderer = <input
        type="checkbox"
        checked={props.value}
        onChange={handleChange}
      />;
      break;

    case 'regexp':
      renderer = <input
        type="text"
        value={props.value}
        className={!valid ? 'invalid' : null}
        onChange={handleChange}
      />;
      break;
  }

  return (
    <div className={`function-param-renderer type-${props.type}`}>
      {renderer}
    </div>
  );
}

export default FunctionParamRenderer;
