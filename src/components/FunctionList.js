import React from 'react';

import Function from './Function';
import { useAppContext } from '../data/AppContext';
import useAppContextActions from '../hooks/useAppContextActions';


const FunctionList = props =>
{
  const [ state ] = useAppContext();
  const { clearFunctions, createFunction, deleteFunction } = useAppContextActions();

  return (
    <div className="function-list-component">
      <div className="action-container">
        <div className="spacer"/>
        <button
          className="action action-clear"
          onClick={() => clearFunctions()}>
          Clear Functions
        </button>
        <button
          className="action action-create"
          onClick={() => createFunction({ index: 0 })}>
          Add Function
        </button>
      </div>
      {
        state.functions.map(
          (fn, index) => <Function
            key={index}
            index={index}
            name={fn.name}
            onRemoveClick={() => deleteFunction({ index })}
            onAddClick={() => createFunction({ index: index + 1 })}
          />
        )
      }
    </div>
  );
};

export default FunctionList;
