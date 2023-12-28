/* eslint-disable strict */
const { chainer } = require('./chainer');

test('should coreect chain functions', () => {
  const mockCallbacks = [
    jest.fn(x => x * 2),
    jest.fn(x => x + 2),
    jest.fn(x => Math.pow(x, 2)),
  ];

  chainer(mockCallbacks)(0);

  expect(mockCallbacks[0].mock.calls[0][0]).toBe(0);
  expect(mockCallbacks[1].mock.calls[0][0]).toBe(0);
  expect(mockCallbacks[2].mock.calls[0][0]).toBe(2);
  expect(chainer(mockCallbacks)(0)).toBe(4);
});
