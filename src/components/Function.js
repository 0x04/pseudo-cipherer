import React from 'react';
import clsx from 'clsx';

import FunctionDefinitions from '../data/FunctionDefinitions';
import { useAppContext } from '../data/AppContext';
import useAppContextActions from '../hooks/useAppContextActions';

import FunctionSelect from './FunctionSelect';
import FunctionParams from './FunctionParams';
import Output from './Output';


const Function = props =>
{
  const [ state ] = useAppContext();
  const {
    createFunction,
    updateFunction,
    deleteFunction,
    moveFunction
  } = useAppContextActions();

  const data = state.functions[props.index];
  const definition = (FunctionDefinitions.exist(props.name))
    ? FunctionDefinitions.get(props.name)
    : {};

  return (
    <div
      className={clsx(
        'function-component',
        (definition.type !== undefined) && `function-type-${definition.type}`
      )}>
      <div className="horizontal-container">
        <div className="vertical-container">
          <div className="function-options horizontal-container">
            <input
              checked={data.enabled}
              onChange={event => updateFunction({
                index: props.index,
                enabled: event.target.checked
              })}
              className="action action-disable"
              type="checkbox"
            />
            <FunctionSelect
              value={props.name}
              groups={FunctionDefinitions.functionGroups}
              onChange={event => updateFunction({
                index: props.index,
                name: event.target.value,
                args: [],
                enabled: data.enabled
              })}
            />
          </div>
          {
            (definition.args?.length > 1)
            && <FunctionParams
              definition={definition}
              args={data.args}
              onChange={args => updateFunction({
                index: props.index,
                name: props.name,
                args
              })}
            />
          }
          {
            (data.error)
            && <div className="error-container">{data.error}</div>
          }
          <Output
            label="Output"
            value={data.output}
          />
        </div>
        <div className="action-container">
          <button
            className="action action-move-up"
            disabled={(props.index < 1)}
            onClick={() => moveFunction(props.index, -1)}>
            Move Up
          </button>
          <button
            className="action action-move-down"
            disabled={(props.index >= state.functions.length - 1)}
            onClick={() => moveFunction(props.index, 1)}>
            Move Down
          </button>
          <button
            className="action action-delete"
            onClick={() => deleteFunction({ index: props.index })}>
            Remove Function
          </button>
          <button
            className="action action-create"
            onClick={() => createFunction({ index: props.index + 1 })}>
            Add Function
          </button>
        </div>
      </div>
    </div>
  );
};

export default Function;
