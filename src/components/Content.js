import React from 'react';

import { useAppContext } from '../data/AppContext'

import Input from './Input'
import Output from './Output'
import FunctionList from './FunctionList'
import useAppContextActions from '../hooks/useAppContextActions';
import Sequence from './Sequence';


const Content = () =>
{
  const [ state ] = useAppContext();
  const { setInputString } = useAppContextActions();

  return (
    <div className="content-component">
      <Input
        id="string-input"
        label="input"
        value={state.input}
        onChange={event => setInputString(event.target.value)}
        onClear={() => setInputString('')}
      />
      <FunctionList />
      <Output
        label="Output"
        value={state.output}
        collapsable={false}
      />
      <Sequence />
    </div>
  );
}

export default Content;
