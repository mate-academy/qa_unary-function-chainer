# QA Unary function chainer
Напиши тесты для функции высшего порядка `chainer` для объединения в цепочку
списка унарных функций. Другими словами, она должна возвращать функцию, которая
выполняет левое сложение для заданных функций.

```javascript
chainer([a,b,c,d])(input) === d(c(b(a(input))));
```

Пример:
```javascript
function f1(x) {return x * 2};
function f2(x) {return x + 2};
function f3(x) {return Math.pow(x, 2)};

chainer([f1, f2, f3])(0) === 4;
```

---
- [Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md)
- Read more about [Jest expectations](https://jestjs.io/uk/docs/expect)
