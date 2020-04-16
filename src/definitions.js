export default {
  'charCase.invert': [
    { name: 'string', type: 'string' },
    { name: 'every', type: 'number', default: 0 }
  ],
  'compressor.pack': [
    { name: 'string', type: 'string' }
  ],
  'compressor.unpack': [
    { name: 'string', type: 'string' }
  ],
  'compressor.signature': [
    { name: 'string', type: 'string' },
    { name: 'withEval', type: 'boolean', default: false }
  ],
  'flipBits': [
    { name: 'string', type: 'string' }
  ],
  'jumble': [
    { name: 'string', type: 'string' },
    { name: 'runs', type: 'number', default: 3 }
  ],
  'reverseBits': [
    { name: 'string', type: 'string' }
  ],
  'reverse': [
    { name: 'string', type: 'string' }
  ],
  'rockdotize': [
    { name: 'string', type: 'string' },
    { name: 'regexp', type: 'regexp', default: /\w/gi }
  ],
  'rot13': [
    { name: 'string', type: 'string' }
  ],
  'scramble': [
    { name: 'string', type: 'string' }
  ],
  'shiftBits': [
    { name: 'string', type: 'string' },
    { name: 'n', type: 'number', default: 1 }
  ],
  'shift': [
    { name: 'string', type: 'string' },
    { name: 'n', type: 'number', default: 1 }
  ],
  'toMANS': [
    { name: 'string', type: 'string' },
    { name: 'type', type: 'number', default: 0, min: 0, max: 12 }
  ]
};
