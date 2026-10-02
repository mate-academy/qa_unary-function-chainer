'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should return a function', () => {
    expect(typeof chainer([])).toBe('function');
  });

  it('should return the input when the list is empty', () => {
    const input = { value: 5 };

    expect(chainer([])(input)).toBe(input);
  });

  it('should apply a single function to the input', () => {
    expect(chainer([(x) => x * 3])(4)).toBe(12);
  });

  it('should apply functions from left to right', () => {
    const functions = [(x) => x * 2, (x) => x + 2, (x) => x ** 2];

    expect(chainer(functions)(3)).toBe(64);
  });

  it('should handle zero as the input', () => {
    const functions = [(x) => x * 2, (x) => x + 2, (x) => x ** 2];

    expect(chainer(functions)(0)).toBe(4);
  });

  it('should pass results of different types to the next function', () => {
    const functions = [
      (x) => ({ value: x + 1 }),
      (x) => [x.value, x.value * 2],
      (x) => x.join(':'),
      (x) => `Result: ${x}`,
    ];

    expect(chainer(functions)(2)).toBe('Result: 3:6');
  });

  it('should pass undefined results to the next function', () => {
    const functions = [() => undefined, (x) => String(x)];

    expect(chainer(functions)(10)).toBe('undefined');
  });

  it('should start with the new input on each call', () => {
    const chained = chainer([(x) => x + 2, (x) => x * 3]);

    chained(1);

    expect(chained(4)).toBe(18);
  });

  it('should not call functions before receiving the input', () => {
    const transform = jest.fn((x) => x + 1);

    chainer([transform]);

    expect(transform).not.toHaveBeenCalled();
  });

  it('should call each function once per invocation', () => {
    const first = jest.fn((x) => x + 1);
    const second = jest.fn((x) => x * 2);

    chainer([first, second])(3);

    expect([first.mock.calls.length, second.mock.calls.length]).toEqual([1, 1]);
  });
});
