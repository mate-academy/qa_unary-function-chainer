'use strict';

const { chainer } = require('./chainer');

describe('chainer', () => {
  const firstFunc = jest.fn((x) => x * 2);
  const secondFunc = jest.fn((x) => x + 2);
  const threeFunc = jest.fn((x) => Math.pow(x, 2));
  const fourFunc = jest.fn((x) => x + 1);
  const fiveFunc = jest.fn((x) => (x * 4) / 2);

  it(`should be defined`, () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it(`should return something`, () => {
    expect(chainer([])()).toBeUndefined();
  });

  it(`should return correct answer for 3 function in chain`, () => {
    const chain = chainer([firstFunc, secondFunc, threeFunc]);

    expect(chain(0)).toEqual(4);
    expect(chain(2)).toEqual(36);
    expect(chain(5)).toEqual(144);
  });

  it(`should return correct answer for 4 function in chain`, () => {
    const chain = chainer([firstFunc, secondFunc, threeFunc, fourFunc]);

    expect(chain(0)).toEqual(5);
    expect(chain(2)).toEqual(37);
    expect(chain(5)).toEqual(145);
  });

  it(`should return correct answer for 5 function in chain`, () => {
    const chain = chainer([
      firstFunc,
      secondFunc,
      threeFunc,
      fourFunc,
      fiveFunc,
    ]);

    expect(chain(0)).toEqual(10);
    expect(chain(2)).toEqual(74);
    expect(chain(5)).toEqual(290);
  });

  it(`should call chained functions with correct values`, () => {
    const chain = chainer([
      firstFunc,
      secondFunc,
      threeFunc,
      fourFunc,
      fiveFunc,
    ]);

    expect(chain(5)).toEqual(290);
    expect(firstFunc).toHaveBeenCalledWith(5);
    expect(secondFunc).toHaveBeenCalledWith(10);
    expect(threeFunc).toHaveBeenCalledWith(12);
    expect(fourFunc).toHaveBeenCalledWith(144);
    expect(fiveFunc).toHaveBeenCalledWith(145);
  });
});
