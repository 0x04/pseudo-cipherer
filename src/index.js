import React from 'react';
import ReactDOM from 'react-dom';
import stringMutilator from '@0x04/string-mutilator';
import definitions, { functionTypes } from './definitions';

import './styles.scss';

const getRealValue = (string, type = 'string') =>
{
  switch (type)
  {
    default:
      return string;

    case 'number':
      let result = parseInt(string, 10);

      if (isNaN(result))
      {
        throw new TypeError('Number is \'NaN\'!');
      }
      return result;

    case 'boolean':
      return /^(1|true|y(es)|on?)$/.test(string);

    case 'regexp':
      let source = string.slice(1, string.lastIndexOf(string[0]));
      let flags = string.slice(string.lastIndexOf(string[0]) + 1);
      return new RegExp(source, flags);
  }
};


const AppContext = React.createContext({});


class AppProvider extends React.Component
{
  state = {
    input: '',
    sequences: [],
    sequenceDetails: {
      value: '',
      error: null
    },
    definitions,
    definitionGroups: [
        'Involutory',
        'Involutory with negated arguments',
        'Involutory with counter function',
        'Non involutory'
      ].map(
        (label, index) => [
          label,
          definitions
            .filter((definition) => definition.type === index)
            .map((definition) => definition.name)
        ]
      ),

    setInput: (input) => this.state.handleChange({ input }),

    isDefinition: (name) =>
    {
      return this.state.definitions
        .some((definition) => definition.name === name);
    },

    getDefinition: (name) =>
    {
      let definition = this.state.definitions
        .find((definition) => definition.name === name);

      if (!definition)
      {
        throw new TypeError(`Definition '${name}' not found!`);
      }

      return definition;
    },

    getSequenceDefaults: (name = '') =>
    {
      let args = [];

      if (name.length > 0)
      {
        args = this.state.getDefinition(name).args
          .slice(1)
          .map((arg) => arg.default);
      }

      return { name, args };
    },

    getSequenceOutput: (sequences) =>
    {
      return sequences.reduce(
        (previous, current) => (current.error === null && current.output)
          ? current.output
          : previous,
        ''
      )
    },

    createSequence: (index = this.state.sequences.length, name = '') =>
    {
      if (index < 0 || index > this.state.sequences.length)
      {
        throw new TypeError(`Invalid index ${index}!`);
      }

      let sequences = this.state.sequences.concat();

      sequences.splice(index, 0, this.state.getSequenceDefaults(name));

      this.state.handleChange({ sequences });
    },

    updateSequence: (index, name = '', args = []) =>
    {
      if (index < 0 || index >= this.state.sequences.length)
      {
        throw new TypeError(`Invalid index ${index}!`);
      }

      let sequences = this.state.sequences.concat();
      let sequence = { ...sequences[index], name, args };

      if (sequences[index].name !== name)
      {
        sequence.args = this.state.getSequenceDefaults(name).args;
      }

      sequences.splice(index, 1, sequence);

      this.state.handleChange({ sequences });
    },

    deleteSequence: (index) =>
    {
      if (index < 0 || index >= this.state.sequences.length)
      {
        throw new TypeError(`Invalid index ${index}!`);
      }

      let sequences = this.state.sequences.concat();

      sequences.splice(index, 1);

      this.state.handleChange({ sequences });
    },

    clearSequences: () => this.setState({ sequences: [] }),

    getSequenceDetails: () => this.state.sequenceDetails.value,

    setSequenceDetails: (string) => {
      let sequences = [];
      let sequenceDetails = { value: string, error: null };

      try
      {
        if (string.length > 0)
        {
          sequences = this.state.parseSequenceDetails(string);
        }
      }
      catch (e)
      {
        sequenceDetails.error = e.message;
      }

      this.state.proceed(this.state.input, sequences);

      let output = this.state.getSequenceOutput(sequences) || this.state.input;

      this.setState({ output, sequences, sequenceDetails });
    },

    buildSequenceDetails: (sequences = this.state.sequences) => sequences
      .map((sequence) =>
      {
        let result = [];

        if (sequence.name)
        {
          result.push(sequence.name);

          if (sequence.args.length > 0)
          {
            result.push(`,${sequence.args.join(',')}`);
          }
        }

        return (result.length > 0)
          ? result.join('')
          : null;
      })
      .filter((value) => value !== null)
      .join('|'),

    parseSequenceDetails: (string) => string.split(/\s*\|\s*/)
      .map((value) =>
      {
        let [ name, ...args ] = value.split(/\s*,\s*/);
        let definitionArgs = this.state.getDefinition(name).args.slice(1);

        if (args.length !== definitionArgs.length)
        {
          throw new TypeError(`Wrong number of arguments for '${name}'!`);
        }

        args = args.map(
          (value, index) => getRealValue(value, definitionArgs[index].type)
        );

        return { name, args };
      }),

    execute: (dotString, params) =>
    {
      const fn = dotString
        .split('.')
        .reduce((o, c) => o[c], stringMutilator);

      return fn.apply(null, params);
    },

    proceed: (input, sequences) =>
    {
      let previous;
      let errorIndex = -1;

      for (let i = 0; i < sequences.length; i++)
      {
        let current = sequences[i];

        try
        {
          current.error = null;

          if ((errorIndex > -1 && errorIndex < i) || !current.name)
          {
            current.output = '';
          }
          else
          {
            current.output = this.state.execute(
              current.name,
              [ previous?.output || input, ...current.args ]
            );
          }
        }
        catch (e)
        {
          current.output = '';
          current.error = e.message;
          errorIndex = i;
        }

        previous = current;
      }

      return sequences;
    },

    handleChange: ({
      input = this.state.input,
      sequences = this.state.sequences.concat(),
      sequenceDetails = { ...this.state.sequenceDetails }
    }) =>
    {
      this.state.proceed(input, sequences);

      let output = this.state.getSequenceOutput(sequences) || input;

      try
      {
        sequenceDetails.error = null;
        sequenceDetails.value = this.state.buildSequenceDetails(sequences);
      }
      catch (e) {
        sequenceDetails.error = e.message;
      }

      this.setState({ input, output, sequences, sequenceDetails });
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}


const blindText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
  + 'Esse explicabo nesciunt nulla? Adipisci consequuntur cum debitis enim '
  + 'exercitationem ipsa minima natus nulla, obcaecati porro provident quia '
  + 'quo ullam vel voluptate.';


const App = () => {
  function createActions(context) {
    return (
      <div className="action-container">
        <div className="spacer"/>
        <button
          className="action action-clear"
          onClick={() => context.clearSequences()}>
          Clear Functions
        </button>
        <button
          className="action action-create"
          onClick={() => context.createSequence(0)}>
          Add Function
        </button>
      </div>
    )
  }

  function createFunctions(context) {
    let functions = context.sequences.map(
      (sequence, index) => <Function
        key={index}
        index={index}
        name={sequence.name}
      />
    )

    return (
      <div className="functions-container">
        {functions}
      </div>
    )
  }

  return (
    <AppProvider>
      <div className="app-component">
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
          <p>
            Enter some text or use the <AppContext.Consumer>
            {
              (context) => <button className="action-link" onClick={(event) => {
                event.preventDefault()
                context.setInput(blindText)
              }}>blind text</button>
            }
          </AppContext.Consumer> and add a function to see the result in
            the output pane.
          </p>
        </div>
        <AppContext.Consumer>
          {(context) => (
            <>
              <Input
                id="string-input"
                label="Input"
                value={context.input}
                onChange={(event) => context.setInput(event.target.value)}
                onClear={() => context.setInput('')}
              />
              {createActions(context)}
              {createFunctions(context)}
              <Output
                label="Output"
                value={context.output}
                collapsable={false}
              />
              <SequenceDetails />
            </>
          )}
        </AppContext.Consumer>
      </div>
    </AppProvider>
  )
};


function Input(props)
{
  return (
    <div className="input-component">
      <label htmlFor={props.id}>{props.label}</label>
      <div className="horizontal-container">
        <textarea
          id={props.id}
          className="input"
          value={props.value}
          onChange={props.onChange}
          placeholder="Please enter text&hellip;"
        />
        <input
          type="reset"
          value="Clear"
          onClick={props.onClear}
        />
      </div>
    </div>
  );
}


const Function = (props) =>
{
  return (
    <div className="function-component">
      <AppContext.Consumer>
        {(context) => (
          <div className="horizontal-container">
            <div className="function-container">
              <FunctionSelect index={props.index} name={props.name}/>
              {
                (context.isDefinition(props.name) && context.getDefinition(props.name).args.length > 1)
                  ? <FunctionParams index={props.index} name={props.name}/>
                  : null
              }
              {
                (context.sequences[props.index].error)
                  ? <div className="error-container">
                      {context.sequences[props.index].error}
                    </div>
                  : null
              }
              <Output label="Output" value={context.sequences[props.index].output} />
            </div>
            <div className="action-container">
              <button
                className="action action-delete"
                onClick={() => context.deleteSequence(props.index)}>
                Remove Function
              </button>
              <button
                className="action action-create"
                onClick={() => context.createSequence(props.index + 1)}>
                Add Function
              </button>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    </div>
  );
};


const FunctionSelect = (props) =>
{
  return (
    <div className="function-select-component">
      <label>
        <span>Function</span>
        <AppContext.Consumer>
          {
            (context) => <select
              value={props.name}
              onChange={(event) => context.updateSequence(props.index, event.target.value)}>
              <option value="" />
              {
                context.definitionGroups.map((group, groupIndex) =>
                {
                  const [ label, fns ] = group;

                  return <optgroup key={groupIndex} label={label}>
                    {
                      fns.map(
                        (fn, fnIndex) => <option key={fnIndex} value={fn}>{fn}</option>
                      )
                    }
                  </optgroup>
                })
              }
            </select>
          }
        </AppContext.Consumer>
      </label>
    </div>
  );
};


const FunctionParams = (props) =>
{
  return (
    <div className="function-params-component">
      <table className="function-params">
        <thead>
          <tr>
            <th>Argument</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <AppContext.Consumer>
          {
            (context) => {
              const args = context.sequences[props.index].args
              const lines = context.getDefinition(props.name).args.slice(1).map(
                (property, index) => <tr key={index}>
                  <td>{property.name}</td>
                  <td>{property.type}</td>
                  <td>
                    <FunctionParamRenderer
                      onChange={(value) => {
                        const newArgs = args.concat()
                        newArgs.splice(index, 1, value)
                        context.updateSequence(props.index, props.name, newArgs)
                      }}
                      {...property}
                      value={args[index]}
                    />
                  </td>
                </tr>
              );
              return (<tbody>{lines}</tbody>);
            }
          }
        </AppContext.Consumer>
      </table>
    </div>
  );
};


class FunctionParamRenderer extends React.Component
{
  state = {
    valid: true
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event)
  {
    let valid = true;
    let value = (event.target.type === 'checkbox')
      ? event.target.checked
      : event.target.value;

    try {
      value = getRealValue(value, this.props.type);
    }
    catch (e) {
      valid = false;
    }

    this.setState({ valid });

    this.props.onChange
      && this.props.onChange(value);
  }

  render()
  {
    let renderer = <div />;

    switch (this.props.type)
    {
      default:
      case 'number':
        renderer = <input
          type="number"
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.handleChange}
        />;
        break;

      case 'boolean':
        renderer = <input
          type="checkbox"
          checked={this.props.value}
          onChange={this.handleChange}
        />
        break;

      case 'regexp':
        renderer = <input
          type="text"
          value={this.props.value}
          className={!this.state.valid ? 'invalid' : null}
          onChange={this.handleChange}
        />
        break;
    }

    return (
      <div className={`function-param-renderer type-${this.props.type}`}>
        {renderer}
      </div>
    );
  }
}


class Output extends React.Component
{
  static defaultProps = {
    collapsable: true
  }

  state = {
    collapsed: true
  }

  render()
  {
    return (
      <div
        className={'output-component' + (this.props.collapsable && this.state.collapsed ? ' collapsed' : '')}>
        <div className="label">
          {
            (this.props.collapsable)
              ? <button
                  className="action-link"
                  onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
                  {this.props.label}
                </button>
              : <span>{this.props.label}</span>
          }
        </div>
        <div
          className="content"
          style={{ display: !this.props.collapsable || !this.state.collapsed ? 'block' : 'none' }}>
          <div className="horizontal-container">
            <pre className="output">
              {this.props.value}
            </pre>
            <CopyButton value={this.props.value} />
          </div>
        </div>
      </div>
    );
  }
}


class CopyButton extends React.Component
{
  static defaultProps = {
    value: ''
  }

  copyToClipboard(text)
  {
    const previousFocus = window.activeElement;
    const textarea = document.createElement('textarea');
    textarea.className = 'copy-button-helper';
    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();
    // For mobile devices
    textarea.setSelectionRange(0, textarea.value.length);

    document.execCommand('copy');

    textarea.remove();

    previousFocus && previousFocus.focus();
  }

  render()
  {
    return (
      <button
        className="action action-copy"
        onClick={() => this.copyToClipboard(this.props.value)}>
        Copy
      </button>
    );
  }
}


class SequenceDetails extends React.Component
{
  state = {
    orientation: false
  }

  render()
  {
    return (
      <AppContext.Consumer>
        {(context) => (
          <div className="sequence-details-component">
            <div className="label">Cipher-Sequence</div>
            <div className="horizontal-container">
              <div className="vertical-container">
                <textarea
                  value={context.getSequenceDetails()}
                  onChange={(event) => context.setSequenceDetails(event.target.value)}
                />
                {
                  (context.sequenceDetails.error)
                    ? <div className="error-container">{context.sequenceDetails.error}</div>
                    : null
                }
              </div>
              <button
                className="action action-invert"
                onClick={() => alert('Not implemented yet!')}>
                Invert
              </button>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}


const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
