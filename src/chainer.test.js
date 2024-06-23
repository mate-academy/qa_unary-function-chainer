'use strict';

const { chainer } = require('./chainer');

describe('function chainer', () => {
  /**
   * @type {jest.Mock[]}
   */
  let functions = [];

  beforeEach(() => {
    for (let i = 0; i < 3; i++) {
      functions.push(jest.fn());
    }
  });

  afterEach(() => {
    functions = [];
  });

  it('should return a function', () => {
    expect(chainer(functions)).toBeInstanceOf(Function);
  });

  it('returned callback should return argument if functions array is empty', () => {
    const returnedCallback = chainer([]);

    expect(returnedCallback('Hello')).toBe('Hello');
  });

  it('returned callback should call only once every function from functions array', () => {
    chainer(functions)();

    functions.forEach((fn) => {
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  it('returned callback should call every functions with one argument', () => {
    functions.forEach((fn) => {
      fn.mockReturnValue('Something');
    });

    chainer(functions)('Something');

    functions.forEach((fn) => {
      expect(fn).toHaveBeenCalledWith('Something');
    });
  });

  it('should correct chain all functions', () => {
    functions.forEach((fn) => {
      fn.mockImplementation((arg) => arg + 2);
    });

    const result = chainer(functions)(0);

    expect(result).toBe(functions.length * 2);
  });
});
