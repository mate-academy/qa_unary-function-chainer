# QA Unary function chainer
Напиши тести для функції вищого порядку `chainer` для об'єднання в ланцюжок
списку унарних функцій. Іншими словами, вона повинна повертати функцію, яка
виконує ліве складання для заданих функцій.

```javascript
chainer([a,b,c,d])(input) === d(c(b(a(input))));
```

Приклад:
```javascript
function f1(x) {return x * 2};
function f2(x) {return x + 2};
function f3(x) {return Math.pow(x, 2)};

chainer([f1, f2, f3])(0) === 4;
```

---
- [Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md)
- Read more about [Jest expectations](https://jestjs.io/uk/docs/expect)
