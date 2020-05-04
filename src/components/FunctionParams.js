import React from 'react';

import FunctionParamRenderer from './FunctionParamRenderer';


const FunctionParams = props =>
{
  return (
    <div className='function-params-component'>
      <table className="function-params">
        <thead>
        <tr>
          <th>Argument</th>
          <th>Type</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {
          props.definition.args.slice(1).map(
            (property, index) => <tr key={index}>
              <td>{property.name}</td>
              <td>{property.type}</td>
              <td>
                <FunctionParamRenderer
                  onChange={value =>
                  {
                    const newArgs = props.args.concat();
                    newArgs.splice(index, 1, value);
                    props.onChange && props.onChange(newArgs);
                  }}
                  {...property}
                  value={props.args[index]}
                />
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default FunctionParams;
