'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should call functions in sequence and return correct result', () => {
    expect(chainer([x => x + 1])(2)).toBe(3);
    expect(chainer([x => x + 1, x => x * 2])(2)).toBe(6);
    expect(chainer([x => x, x => x])(2)).toBe(2);
    expect(chainer([x => x * 2, x => '2 + 2 = ' + x])(2)).toBe('2 + 2 = 4');
  });

  it(
    'should return input as-is for empty function array '
    + 'and handle undefined result',
    () => {
      expect(chainer([])(2)).toBe(2);
      expect(chainer([() => undefined])(2)).toBeUndefined();
    }
  );

  it('should call all functions in correct order with correct values', () => {
    const f = jest.fn((x) => x + 1);
    const s = jest.fn((x) => x * 2);
    const t = jest.fn((x) => x - 3);

    chainer([f, s, t])(2);

    expect(f).toHaveBeenCalled();
    expect(s).toHaveBeenCalled();
    expect(t).toHaveBeenCalled();

    expect(f).toHaveBeenCalledWith(2);
    expect(s).toHaveBeenCalledWith(3);
    expect(t).toHaveBeenCalledWith(6);
  });
});
