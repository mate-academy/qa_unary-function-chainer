'use strict';

const { chainer } = require('./chainer');

describe(`'chainer' test`, () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('test chainer for 3 functions', () => {
    const mockF1 = jest.fn((x) => x + 2);
    const mockF2 = jest.fn((x) => x * 2);
    const mockF3 = jest.fn((x) => x - 3);

    chainer([mockF1, mockF2, mockF3])(2);

    expect(mockF1.mock.calls).toHaveLength(1);
    expect(mockF1.mock.calls[0][0]).toBe(2);
    expect(mockF2.mock.calls).toHaveLength(1);
    expect(mockF2.mock.calls[0][0]).toBe(4);
    expect(mockF3.mock.calls).toHaveLength(1);
    expect(mockF3.mock.calls[0][0]).toBe(8);

    expect(mockF1.mock.results[0].value).toBe(4);
    expect(mockF2.mock.results[0].value).toBe(8);
    expect(mockF3.mock.results[0].value).toBe(5);
  });
});
