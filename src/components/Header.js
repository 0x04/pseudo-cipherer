import React, {useEffect, useState} from 'react';

import { blindText } from '../constants';
import { getCipherStringFromURL } from '../functions';

import useAppContextActions from '../hooks/useAppContextActions';

import Modal from './Modal';
import Decipherer from './Decipherer';

const Header = () =>
{
  const { setInputString, setCipherString } = useAppContextActions();

  const [ modalVisible, setModalVisible ] = useState(false);

  useEffect(() =>
    {
      const cipherString = getCipherStringFromURL(window.location.search);

      if (cipherString && window.confirm('Do you want to load the cipher string from the url?'))
      {
        try
        {
          setCipherString(cipherString);
        }
        catch (e)
        {
          alert(`Conversation failed: ${e.message}!`);
        }
      }
    },
    []
  );

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
        <p>If you just want to decipher a message you received,
          click <button
            className="action-link"
            onClick={() => setModalVisible(!modalVisible)}>
            here
          </button>!

        </p>
      </div>
      <Modal
        visible={modalVisible}
        onVisibilityChange={(value) => setModalVisible(value)}>
        <Decipherer onCancelClick={() => setModalVisible(false)} />
      </Modal>
    </div>
  );
};

export default Header;
