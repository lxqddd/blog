---
title: 第一篇文章
author: 向阳
date: "2022-05-12"
---

# 手写 `instanceof`

手写什么什么的实现，一般是我比较怂的。今天来写一个简单点的，手动实现一次 `instanceof` 运算符。

## `instanceof` 运算符的作用

既然要手动实现一下 `instanceof`。那必然是要清楚 `instanceof` 是什么、能干什么。

MDN 上边给的解释是：

> `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

这里其实是不考虑当前实例对象是否是该构造函数的实例对象，只要能在当前实例对象的原型链上找到该构造函数的原型对象，`instanceof` 运算符就会返回 `true`。

看一下实例代码

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = new Person("向阳", 18);
console.log(person instanceof Person); // true
```

创建一个构造函数 `Person`， 然后创建一个 `Person` 的实例对象 `person`，此时 `person.__proto__ === Person.prototype`，所以打印的时候打印出来的是 `true`。

下面再来看上边提到的另外一种情况：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj = {};
obj.__proto__ = Person.prototype;
console.log(obj instanceof Person); // true
```

创建一个空对象 `obj`，将 `obj` 的 `__proto__` 设置为构造函数 `Person` 的原型对象。

此时打印出来的也是 `true`。

这也就是为什么我们经常说的使用 `instanceof` 判断一个对象是否是一个构造函数的实例对象不准确的原因。就是因为实例对象的原型链是可以被改写的。

好了，说完了 `instanceof` 的作用之后，接下来就开始动手实现一下叭！
![](https://files.mdnice.com/user/17954/1506ce5d-f0e4-4bd9-a877-21050e131447.png)

## 实现 `instanceof`

话不多说，线上代码再解释！

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = new Person("向阳", 18);
const obj = {};
// obj.__proto__ = Person.prototype

/**
 *
 * @param { object } src 实例对象
 * @param { function } target 构造函数
 */
function myInstanceof(src, target) {
  if (!src || !target) {
    console.warn("参数都没传对就来了");
    return;
  }
  if (typeof target !== "function") {
    throw Error("target 不是一个构造函数！");
  }
  let proto = Object.getPrototypeOf(src);
  // 也可以用 proto = src.__proto__
  const targetProto = target.prototype;

  while (true) {
    if (!proto) return false;
    if (proto === targetProto) return true;
    proto = Object.getPrototypeOf(proto);
    // 也可以用 proto = proto.__proto__
  }
}
console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(obj, Person)); // false

obj.__proto__ = Person.prototype;
console.log(myInstanceof(obj, Person)); // true
```

创建一个函数 `myInstanceof`，需要传入两个参数，第一个 `src` 是实例对象，第二个 `target` 是构造函数。

首先处理一下参数的问题，防止因为参数没传对而报错。

然后判断一下传进来的 `target` 是不是一个构造函数，如果不是，那后边就不用玩了。

获取构造函数的原型对象。这里你想用哪种方法都行，`Object.getPrototypeOf`是 `Object` 提供的获取对象原型的方法，`src.__proto__`，则是手动去访问对象的原型，效果是一样的。

拿到构造函数的原型对象 `targetProto`

写一个 `while` 循环，因为你不知道要循环多少次，所以循环次数直接设置为 `true`。

先处理异常情况，如果没有 `proto` 直接退出循环，并返回 `false`.

如果存在，判断 `proto` 和 `targetProto` 是否相等，如果相等则退出循环，返回 `true`。

如果不相等，则顺着 `src` 的原型链，往上接着找 `proto` 的原型对象，开始下一次循环。

至此，手动实现 `instanceof` 运算符就讲完啦！
![](https://files.mdnice.com/user/17954/3464ccf7-2e2b-4506-970f-326a88a8c245.png)
如果你觉得写的不错的话，欢迎三连~
![](https://img.soogif.com/5HkHKKxGJ6ZmhQ7c8nLYOE9jfEXDpqp4.gif?scope=mdnice)

<LastUpdated />
