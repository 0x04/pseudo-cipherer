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
        continue;
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
      continue;
    }

    previous = current;
  }

  return functions;
};

const getFunctionOutput = functions =>
  functions
    .reduce(
      (previous, current) => (current.output.length > 0)
        ? current.output
        : previous,
      ''
    );

const buildSequenceString = functions =>
  functions
    .map(fn =>
    {
      let result = [];

      if (fn.name && fn.enabled)
      {
        result.push(fn.name);

        if (fn.args.length > 0)
        {
          result.push(`,${fn.args.join(',')}`);
        }
      }

      return (result.length > 0)
        ? result.join('')
        : null;
    })
    .filter(value => value !== null)
    .join('|');

const parseSequenceString = string =>
  string
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

      return { name, args, enabled: true };
    });

const parseCipherString = string =>
{
  const containsDecipher = /(.*)\u2404([\u0020-\uFFFF]+)$/m;

  if (!containsDecipher.test(string))
  {
    throw new TypeError(`String doesn't contain a decipher sequence!`);
  }

  let [ , input, sequence ] = string.match(containsDecipher);

  return [ input, stringMutilator.compressor.unpack(sequence) ];
}

const decipherCipherString = string =>
{
  const [ input, sequence ] = parseCipherString(string);

  let functions = parseSequenceString(sequence);

  proceed(input, functions);

  return getFunctionOutput(functions);
}

const buildCipherString = (input, sequence) =>
{
  if (!input || !sequence)
  {
    throw new TypeError('No `input` or `sequence` is given!');
  }

  return `${input}\u2404${stringMutilator.compressor.pack(sequence)}`;
}

const getCipherStringFromURL = (url, query = 'cipher') =>
{
  let regexp = new RegExp(`[?&]${query}=([^&]+)$`);
  return (regexp.test(url))
    ? decodeURIComponent(url.match(regexp)[1])
    : null;
}

export {
  getRealValue,
  proceed,
  getFunctionOutput,
  buildSequenceString,
  parseSequenceString,
  parseCipherString,
  buildCipherString,
  decipherCipherString,
  getCipherStringFromURL
};
