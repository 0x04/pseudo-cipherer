const functionTypes = {
  involutory: 0,
  involutoryNegatedArgs: 1,
  involutoryCounterFn: 2,
  nonInvolutory: 3
};

const definitions = [
  {
    name: 'charCase.invert',
    type: functionTypes.involutoryNegatedArgs,
    args: [
      { name: 'string', type: 'string' },
      { name: 'every', type: 'number', default: 0 }
    ]
  },
  {
    name: 'compressor.pack',
    type: functionTypes.involutoryCounterFn,
    counterFn: 'compressor.unpack',
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'compressor.unpack',
    type: functionTypes.involutoryCounterFn,
    counterFn: 'compressor.pack',
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'compressor.signature',
    type: functionTypes.nonInvolutory,
    args: [
      { name: 'string', type: 'string' },
      { name: 'withEval', type: 'boolean', default: false }
    ]
  },
  {
    name: 'flipBits',
    type: functionTypes.involutory,
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'gobbledygook',
    type: functionTypes.nonInvolutory,
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'jumble',
    type: functionTypes.nonInvolutory,
    args: [
      { name: 'string', type: 'string' },
      { name: 'runs', type: 'number', default: 3 }
    ]
  },
  {
    name: 'reverseBits',
    type: functionTypes.involutory,
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'reverse',
    type: functionTypes.involutory,
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'rockdotize',
    type: functionTypes.nonInvolutory,
    args: [
      { name: 'string', type: 'string' },
      { name: 'regexp', type: 'regexp', default: /\w/gi }
    ]
  },
  {
    name: 'rot13',
    type: functionTypes.involutory,
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'scramble',
    type: functionTypes.nonInvolutory,
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'shiftBits',
    type: functionTypes.involutoryNegatedArgs,
    args: [
      { name: 'string', type: 'string' },
      { name: 'n', type: 'number', default: 1 }
    ]
  },
  {
    name: 'shift',
    type: functionTypes.involutoryNegatedArgs,
    args: [
      { name: 'string', type: 'string' },
      { name: 'n', type: 'number', default: 1 }
    ]
  },
  {
    name: 'toMANS',
    type: functionTypes.nonInvolutory,
    args: [
      { name: 'string', type: 'string' },
      { name: 'type', type: 'number', default: 0, min: 0, max: 12 }
    ]
  },
  {
    name: 'unicode.fixSurrogates',
    type: functionTypes.involutoryCounterFn,
    counterFn: 'unicode.unfixSurrogates',
    args: [
      { name: 'string', type: 'string' }
    ]
  },
  {
    name: 'unicode.unfixSurrogates',
    type: functionTypes.involutoryCounterFn,
    counterFn: 'unicode.fixSurrogates',
    args: [
      { name: 'string', type: 'string' }
    ]
  }
];

export default definitions;

export
{
  functionTypes
};
