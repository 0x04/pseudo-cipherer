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
  const { updateFunction } = useAppContextActions();

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
          <FunctionSelect
            value={props.name}
            groups={FunctionDefinitions.functionGroups}
            onChange={event => updateFunction({
              index: props.index,
              name: event.target.value,
              args: []
            })}
          />
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
            className="action action-delete"
            onClick={props.onRemoveClick}>
            Remove Function
          </button>
          <button
            className="action action-create"
            onClick={props.onAddClick}>
            Add Function
          </button>
        </div>
      </div>
    </div>
  );
};

export default Function;
