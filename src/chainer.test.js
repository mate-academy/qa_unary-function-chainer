const { chainer } = require('./chainer');

describe('chainer', () => {
  it('should be declared', () => {
    expect(chainer).toBeInstanceOf(Function);
  });

  it('should return function', () => {
    expect(chainer()).toBeInstanceOf(Function);
  });

  it('should return the initial value when no functions are provided', () => {
    const result = chainer([])(5);
    expect(result).toBe(5);
  });

  it('should return the input value unchanged when a single identity function is provided', () => {
    const identity = jest.fn(x => x);
    const result = chainer([identity])(10);
    
    expect(result).toBe(10);
    expect(identity).toHaveBeenCalledWith(10);
  });

  it('should chain multiple functions correctly', () => {
    const double = jest.fn(x => x * 2);
    const square = jest.fn(x => x ** 2);
    const increment = jest.fn(x => x + 1);

    const result = chainer([double, square, increment])(3);

    expect(result).toBe(37);
    expect(double).toHaveBeenCalledWith(3);
    expect(square).toHaveBeenCalledWith(6);
    expect(increment).toHaveBeenCalledWith(36);
  });
})

