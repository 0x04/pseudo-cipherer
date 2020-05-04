import React from 'react';


const FunctionSelect = ({ value = '', groups = [], onChange }) => (
  <div className="function-select-component">
    <label>
      <span>Function</span>
      <select
        value={value}
        onChange={onChange}>
        <option value=""/>
        {
          groups.map((group, groupIndex) =>
          {
            const [ label, fns ] = group;

            return (
              <optgroup
                className={`function-type-${groupIndex}`}
                key={groupIndex}
                label={label}>
                {
                  fns.map((fn, fnIndex) =>
                    <option key={fnIndex} value={fn}>{fn}</option>
                  )
                }
              </optgroup>
            );
          })
        }
      </select>
    </label>
  </div>
);

export default FunctionSelect;
