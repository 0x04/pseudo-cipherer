import React from 'react';

import { blindText } from '../constants';

import useAppContextActions from '../hooks/useAppContextActions';


const Header = () =>
{
  const { setInputString } = useAppContextActions();

  return (
    <div className="header-component">
      <h1 className="title">Pseudo Cipherer</h1>
      <div className="description">
        <p>A demonstration of the <code>
          <a
            href="https://github.com/0x04/string-mutilator"
            target="_blank"
            rel="noopener noreferrer">
            @0x04/string-mutilator
          </a>
        </code> package.
        </p>
        <p>Enter some text or use the <button
          className="action-link"
          onClick={() => setInputString(blindText)}>
          blind text
        </button> and add a function to see the result in the output pane.
        </p>
      </div>
    </div>
  );
};

export default Header;


