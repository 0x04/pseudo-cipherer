import React from 'react';

import { useAppContext } from '../data/AppContext';
import useAppContextActions from '../hooks/useAppContextActions';
import {buildCipherString } from '../functions';

import CopyButton from './CopyButton';


const Sequence = ({ showLength = true }) =>
{
  const [ state ] = useAppContext();
  const { value, error } = state.sequence;
  const {
    setSequenceString,
    invertFunctions
  } = useAppContextActions();

  function copyCipheredStringFn(sequence)
  {
    return buildCipherString(state.input, sequence);
  }

  return (
    <div className="sequence-component">
      <label
        className="label"
        htmlFor="cipher-sequence">
        Cipher/Decipher-Sequence
        {
          (showLength)
          && <span className="length">{`(${value.length})`}</span>
        }
      </label>
      <div className="vertical-container">
            <textarea
              id="cipher-sequence"
              className="output"
              value={value}
              onChange={event => setSequenceString(event.target.value)}
            />
        {
          (error)
            && <div className="error-container">{error}</div>
        }
      </div>
      <CopyButton value={value} />
      <CopyButton
        label="Copy Cipher String"
        value={value}
        function={copyCipheredStringFn}
        className="action-copy-cipher-string"
      />
      <button
        className="action action-invert"
        onClick={() => invertFunctions()}>
        Invert
      </button>
    </div>
  );
};

export default Sequence;