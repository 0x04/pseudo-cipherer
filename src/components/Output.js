import React, { useState } from 'react';
import clsx from 'clsx';

import CopyButton from './CopyButton';


const Output = ({ label, value, collapsable = true }) =>
{
  const [ state, setState ] = useState({ collapsed: true });

  return (
    <div
      className={clsx('output-component', (collapsable && state.collapsed) && ' collapsed')}>
      <div className="label">
        {
          (collapsable)
            ? <button
              className="action-link"
              onClick={() => setState({ collapsed: !state.collapsed })}>
              {label}
            </button>
            : <span>{label}</span>
        }
      </div>
      <div
        className="content"
        style={{ display: !collapsable || !state.collapsed ? 'block' : 'none' }}>
        <div className="horizontal-container">
          <pre className="output">
            {value}
          </pre>
          <CopyButton value={value} />
        </div>
      </div>
    </div>
  );
};

export default Output;
