/* eslint-disable strict */
const { chainer } = require('./chainer');

const callbacks = [
  jest.fn((x) => x + 2),
  jest.fn((x) => x * 2),
  jest.fn((x) => Math.pow(x, 2)),
];

describe('chainer test', () => {
  beforeEach(() => {
    chainer([...callbacks])(2);
  });

  it('should call each function one time', () => {
    expect(callbacks[0]).toHaveBeenCalledTimes(1);
    expect(callbacks[1]).toHaveBeenCalledTimes(1);
    expect(callbacks[2]).toHaveBeenCalledTimes(1);
  });

  it('should call each function with an appropriate parameter', () => {
    expect(callbacks[0].mock.calls[0]).toEqual([2]);
    expect(callbacks[1].mock.calls[0]).toEqual([4]);
    expect(callbacks[2].mock.calls[0]).toEqual([8]);
  });

  it('should each function return appropriate result', () => {
    expect(callbacks[0].mock.results[0].value).toEqual(4);
    expect(callbacks[1].mock.results[0].value).toEqual(8);
    expect(callbacks[2].mock.results[0].value).toEqual(64);
  });
});
