import React from 'react';

import { useAppContext } from '../data/AppContext';
import useAppContextActions from '../hooks/useAppContextActions';

import CopyButton from './CopyButton';


const Sequence = () =>
{
  const [ state ] = useAppContext();
  const { setSequenceString, invertFunctions } = useAppContextActions();

  return (
    <div className="sequence-string-component">
      <label className="label"
             htmlFor="cipher-sequence">Cipher/Decipher-Sequence</label>
      <div className="vertical-container">
            <textarea
              id="cipher-sequence"
              className="output"
              value={state.sequence.value}
              onChange={event => setSequenceString(event.target.value)}
            />
        {
          (state.sequence.error)
            && <div className="error-container">{state.sequence.error}</div>
        }
      </div>
      <CopyButton value={state.sequence.value}/>
      <button
        className="action action-invert"
        onClick={() => invertFunctions()}>
        Invert
      </button>
    </div>
  );
};

export default Sequence;