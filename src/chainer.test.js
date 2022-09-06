'use strict';

const { chainer } = require('./chainer');

describe('chainer function', () => {
    function f1(x) {return x * 2};
    function f2(x) {return x + 2};
    function f3(x) {return Math.pow(x, 2)};

    it('should be a function', () => {

        expect(chainer)
      .toBeInstanceOf(Function);
    });

    it('should return a defined answer', () => {
        
        expect(chainer([])(0))
        .toBeDefined();
    });
       
    it('arg function should be called if it appears in arguments', () => {
        const myMock = jest.fn();

        chainer([myMock])(0);

        expect(myMock)
        .toBeCalled();
    });
          
    it('arg function should be called with the argument in the brackets', () => {
        const myMock = jest.fn();

        chainer([myMock])(0);

        expect(myMock)
        .toHaveBeenCalledWith(0);
    });
      
    it('arg function should be called the number of times it appears in arguments', () => {
        const myMock = jest.fn();

        chainer([myMock, myMock, myMock])(0);

        expect(myMock.mock.calls.length).toBe(3);
    });
    
    it(`functions should not modify the given argument`, () => {
        const myMock = jest.fn((x) => x);

        chainer([myMock, myMock, myMock, myMock, myMock])(0);

        expect(myMock)
        .toHaveBeenLastCalledWith(0);
    });

    it('should return the number given, after a function', () => {

        expect(chainer([f1])(0))
        .toBe(0);
    });
        
    it('should return the number given, after a multiple functions', () => {

        expect(chainer([f1, f2, f3])(0))
        .toBe(4);
    });  
           
    it('should work with the negative numbers', () => {

        expect(chainer([f1, f2, f3])(-3))
        .toBe(16);
    });
             
    it('should work with the float numbers', () => {

        expect(chainer([f1, f2, f3])(0.3))
        .toBeCloseTo(6.76);
    });
                 
    it(`should work with first value of multiple numbers` + 
        `and ommit others`, () => {

        expect(chainer([f1, f2, f3])(2, 3)) // ((2*2)+2)^2 = 36
        .toBe(36);
    });
    // negative scenario:
    it('should return "NaN" if string was pasted', () => {

        expect(chainer([f1, f2, f3])('qwe'))
        .toBeNaN();
    });

    it('should return "NaN" if nothing was pasted', () => {

        expect(chainer([f1, f2, f3])())
        .toBeNaN();
    });
});