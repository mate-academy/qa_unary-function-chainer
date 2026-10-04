'use strict';

describe('chainer', () => {
  const { chainer } = require('./chainer');

  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should apply functions in left-to-right order to the input value', () => {
    const f1 = (x) => x * 2;
    const f2 = (x) => x + 2;
    const f3 = (x) => Math.pow(x, 2);

    const result = chainer([f1, f2, f3])(0);

    expect(result).toBe(4);
  });

  it(
    `should pass the output of each function as input` +
      ` to the next function`,
    () => {
      const f1 = jest.fn().mockReturnValue('firstResult');
      const f2 = jest.fn().mockReturnValue('secondResult');
      const f3 = jest.fn().mockReturnValue('finalResult');

      const result = chainer([f1, f2, f3])('start');

      expect(f1).toHaveBeenCalledWith('start');
      expect(f2).toHaveBeenCalledWith('firstResult');
      expect(f3).toHaveBeenCalledWith('secondResult');
      expect(result).toBe('finalResult');
    },
  );

  it(
    `should return the original input value` +
      ` when given an empty array of functions`,
    () => {
      const inputNumber = 42;
      const inputString = 'hello';

      expect(chainer([])(inputNumber)).toBe(inputNumber);
      expect(chainer([])(inputString)).toBe(inputString);
    },
  );

  it('should correctly handle an array with a single function', () => {
    const f1 = jest.fn().mockReturnValue(100);

    const result = chainer([f1])(5);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f1).toHaveBeenCalledWith(5);
    expect(result).toBe(100);
  });

  it(`should call each function in the array exactly once and only when invoked`, () => {
    const f1 = jest.fn((x) => x + 1);
    const f2 = jest.fn((x) => x * 2);

    const chainedFn = chainer([f1, f2]);

    expect(f1).not.toHaveBeenCalled();
    expect(f2).not.toHaveBeenCalled();

    chainedFn(10);

    expect(f1).toHaveBeenCalledTimes(1);
    expect(f2).toHaveBeenCalledTimes(1);
  });
});
