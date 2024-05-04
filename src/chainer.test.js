'use strict';

/**
 * @param {function[]} functions
 *
 * @returns {function}
 */

const { chainer } = require('./chainer');

describe('chainer', () => {
    it('should be declared', () => {
        expect(chainer).toBeInstanceOf(Function);
    });

    it('should apply each function from array to the input', () => {
        const f1 = jest.fn(x => x + 2);
        const f2 = jest.fn(x => x * 2);
        const f3 = jest.fn(x => Math.pow(x, 2));
        const result = chainer([f1, f2, f3])(2);

        expect(f1).toHaveBeenCalledWith(2);
        expect(f2).toHaveBeenCalledWith(4);
        expect(f3).toHaveBeenCalledWith(8);
        expect(result).toBe(64);
    });
    
    it('should work with negative input', () => {
        const f1 = jest.fn(x => x + 2);
        const f2 = jest.fn(x => x * 2);
        const f3 = jest.fn(x => Math.pow(x, 2));
        const result = chainer([f1, f2, f3])(-2);

        expect(f1).toHaveBeenCalledWith(-2);
        expect(f2).toHaveBeenCalledWith(0);
        expect(f3).toHaveBeenCalledWith(0);
        expect(result).toBe(0);
    });
    
    it(`should return 'NaN' with undefined input`, () => {
        const f1 = jest.fn(x => x + 2);
        const f2 = jest.fn(x => x * 2);
        const f3 = jest.fn(x => Math.pow(x, 2));
        const result = chainer([f1, f2, f3])(undefined);

        expect(f1).toHaveBeenCalledWith(undefined);
        expect(f2).toHaveBeenCalledWith(NaN);
        expect(f3).toHaveBeenCalledWith(NaN);
        expect(result).toBe(NaN);
    });
    
    it(`should return 'NaN' when input is missing`, () => {
        const f1 = jest.fn(x => x + 2);
        const f2 = jest.fn(x => x * 2);
        const f3 = jest.fn(x => Math.pow(x, 2));
        const result = chainer([f1, f2, f3])();

        expect(result).toBe(NaN);
    });
    
    it('should return input when an array of functions is empty', () => {
        const result = chainer([])(2);

        expect(result).toEqual(2);
    });
});
