import React, {useState} from 'react';
import useAppContextActions from '../hooks/useAppContextActions';
import { decipherCipherString } from '../functions';


const Decipherer = (props) =>
{
  const [ value, setValue ] = useState('');
  const [ error, setError ] = useState('');

  const handleDecipherClick = () =>
  {
    setError('');

    try
    {
      setValue(decipherCipherString(value));
    }
    catch (e)
    {
      setError(e.message);
    }
  }

  return (
    <div className="decipherer-component">
      <textarea
        className="input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {
        (!!error)
          && <div className="error-container">{error}</div>
      }
      <div className="action-container">
        <div className="spacer" />
        <button
          className="action action-decipher"
          onClick={handleDecipherClick}>
          Deciper!
        </button>
        <button
          className="action action-cancel"
          onClick={props.onCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Decipherer;
