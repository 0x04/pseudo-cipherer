import FunctionDefinitions from './data/FunctionDefinitions';

import stringMutilator from '@0x04/string-mutilator';


const execute = (dotString, params) =>
{
  const fn = dotString
    .split('.')
    .reduce((o, c) => o[c], stringMutilator);

  return fn.apply(null, params);
};

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

const proceed = (input, functions) =>
{
  let previous;
  let errorIndex = -1;

  for (let i = 0; i < functions.length; i++)
  {
    let current = functions[i];

    try
    {
      current.error = null;

      if ((errorIndex > -1 && errorIndex < i) || !current.enabled || !current.name)
      {
        current.output = '';
      }
      else
      {
        current.output = execute(
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

  return functions;
};

const getSequenceOutput = sequences => sequences
.reduce(
  (previous, current) => (current.output.length > 0)
    ? current.output
    : previous,
  ''
);

const buildSequenceString = sequences => sequences
  .map(sequence =>
  {
    let result = [];

    if (sequence.name && sequence.enabled)
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
  .filter(value => value !== null)
  .join('|');

const parseSequenceString = string => string
  .split(/\s*\|\s*/)
  .map(value =>
  {
    let [ name, ...args ] = value.split(/\s*,\s*/);
    let defaultArgs = FunctionDefinitions.get(name).args.slice(1);

    if (args.length !== defaultArgs.length)
    {
      throw new TypeError(`Wrong number of arguments for '${name}'!`);
    }

    args = args.map(
      (value, index) => getRealValue(value, defaultArgs[index].type)
    );

    return { name, args };
  });

export {
  getRealValue,
  proceed,
  getSequenceOutput,
  buildSequenceString,
  parseSequenceString
};
