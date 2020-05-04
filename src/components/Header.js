import React, {useState} from 'react';

import { blindText } from '../constants';

import useAppContextActions from '../hooks/useAppContextActions';

import Modal from './Modal';
import Decipherer from './Decipherer';

const Header = () =>
{
  const { setInputString } = useAppContextActions();

  const [ modalVisible, setModalVisible ] = useState(false);

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


