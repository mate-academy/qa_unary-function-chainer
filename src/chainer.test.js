'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it(`should correctly chain functions and return the expected result`, () => {
    const addOne = (x) => x + 1;
    const multiplyByTwo = (x) => x * 2;
    const subtractThree = (x) => x - 3;

    const chainedFunctions = chainer([addOne, multiplyByTwo, subtractThree]);

    expect(chainedFunctions(5)).toEqual(9);
  });

  it(`should correctly chain functions and return the expected'
  + 'result for 0 value`, () => {
    const addOne = (x) => x + 1;
    const multiplyByTwo = (x) => x * 2;
    const subtractThree = (x) => x - 3;

    const chainedFunctions = chainer([addOne, multiplyByTwo, subtractThree]);

    expect(chainedFunctions(0)).toEqual(-1);
  });

  it(`should correctly chain functions and return the expected'
  + 'result for null value`, () => {
    const addOne = (x) => x + 1;
    const multiplyByTwo = (x) => x * 2;
    const subtractThree = (x) => x - 3;

    const chainedFunctions = chainer([addOne, multiplyByTwo, subtractThree]);

    expect(chainedFunctions(null)).toEqual(-1);
  });

  it(`should correctly chain functions and return the expected'
  + 'result for undefined value`, () => {
    const addOne = (x) => x + 1;
    const multiplyByTwo = (x) => x * 2;
    const subtractThree = (x) => x - 3;

    const chainedFunctions = chainer([addOne, multiplyByTwo, subtractThree]);

    const result = chainedFunctions(undefined);

    expect(Number.isNaN(result)).toBe(true);
  });
});
