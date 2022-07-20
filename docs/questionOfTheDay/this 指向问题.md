---
title: this 指向问题
author: 向阳
date: '2022-07-12'
---

# this 指向问题

在前一段时间找工作面试的过程中，总是会被问到 `this` 指向谁的问题。我在回答的时候都是通过几个例子来答的，比如在非严格模式下普通函数在调用的时候 `this` 是指向 `window` 的；如果是一个对象，调用它自身的一些方法，那这个方法中的 `this` 指向的就是调用该方法的对象；再就是加一句通过 `call`、`apply`、`bind` 可以改变 `this` 的指向。

最后觉得还是不完善，再补充一句：“方法被谁调用，`this` 就指向谁。”

这么说其实没什么问题，但是感觉太笼统了。最近一直再想如何能把这句话更具体化，所以也就有了这篇文章。

## 简单的函数调用

感觉要讲清楚这种类型的问题，还是要依靠代码，所以我们还是通过代码来举例叭。

```javascript
function fn1() {
  console.log(this) // window
}
fn1()

function fn2() {
  'use strict'
  console.log(this) // undefined
}
fn2
```

我们在全局作用域中声明一个函数 `foo`，然后调用它，这时候 `foo` 中的 `this` 指向谁？

在严格模式下，`foo` 中的 `this` 指向的是 `undefined`；在非严格模式下，在浏览器环境中指向的是 `window`，在 Node 环境中指向的是 `global`。

回想那句 “方法被谁调用，`this` 就指向谁”，我就纳闷了，在非严格模式下，也没看到 `window` 调用了 fn1 啊，为啥 `this` 会指向 `window` 呢？

其实是这样的，当你在全局作用域声明一个 函数的时候，这个函数其实是会被挂载到 `window` 上的；`window.fn1()` 跟 `fn1()` 的输出结果也是等价的。

不信你看！
![](https://files.mdnice.com/user/17954/21e22734-0db1-4a92-8e52-6d3a9994bcd5.png)
有的吧！

这个比较基础，接下来看一个升级版的

```javascript
const obj = {
  name: '向阳',
  fn() {
    console.log(this)
    console.log(this.name)
  }
}

const foo = obj.fn

foo()
```

这种情况下 `this` 指向的是谁呢？

答案还是 `window`。

这时候你可能会想，诶为啥呢？不是说好的谁调用，`this` 就指向谁吗？咋到这儿就变卦了呢？

其实并没有啊，这里虽然用了 `obj.fn`，但是实际上在这里 `fn` 并没有被调用，相当与只是把 `fn` 这个函数赋值给 `foo`，调用也是通过 `foo` 调用的。赋值之后跟 `obj` 就没有半毛钱关系了。

所以以上代码的输出结果是 `window` 和 `undefined`

如果将调用方式改一下，直接通过 `obj.fn` 来调用，这样返回的结果才是 `obj` 和 `向阳`

综上，在执行函数的时候，不应该仅考虑显式的绑定关系。如果函数是被上一级的对象所调用，那么函数中的 `this`，指向的就是调用该函数的上一级对象，否则的话，函数中的 `this` 指向的就是全局对象。

## 上下文对象中的 `this`

先上一段代码，你可以先看看思考一下，看看会输出怎样的结果

```javascript
const obj = {
  name: '向阳',
  children: {
    name: 'hy',
    fn() {
      console.log(this.name)
    }
  }
}
obj.children.fn()
```

答案是 `hy`，为什么呢？其实很简单，这里的 `fn` 是被 `children` 调用的，虽然前边还有一个 `obj`，但是离的太远，我是不认的，我只关心离我最近的一个。

接下来再看一个更复杂点的

```javascript
const obj1 = {
  name: 'xy1',
  fn() {
    return this.name
  }
}

const obj2 = {
  name: 'xy2',
  fn() {
    return obj1.fn()
  }
}

const obj3 = {
  name: 'xy3',
  fn() {
    const foo = obj1.fn
    return foo()
  }
}

console.log(obj1.fn())
console.log(obj2.fn())
console.log(obj3.fn())
```

打印的第一个结果大家应该都没什么疑问，就是 `xy1`。

那第二个结果呢？其实也不应该又问题，返回的还是 `obj1.fn()` 的结果嘛，而 `obj1.fn()` 的结果是 `xy1`，所以第二个打印的结果还是 `xy1`。

第三个就有点绕，其实这个跟第一节的最后一个例子是一样的；函数 `obj1.fn` 被赋值给变量 `foo`，而 `foo` 在调用的时候也没有被显式的调用，所以 `foo` 中的 `this` 指向的是 `window`，而 `window` 上边没有 `name` 属性，所以打印结果是 `undefined`。

## `new` 对 `this` 的影响

`new` 这个关键字大家应该都很熟悉了，通常我们通过 `new` 一个构造函数来创建一个实例对象。

## 总结

- 在函数体中，简单的调用函数时，在严格模式下，函数内部的 `this` 会被绑定到 `undefined` 上；在非严格模式下，在浏览器环境会被绑定到 `window` 上，在 Node 环境下，会被绑定到 `global` 上。
- 当使用 `new` 方法调用构造函数时，构造函数内部的 `this` 会被绑定到新创建的实例对象上。
- 当使用 `call`、`apply`、`bind` 显示的调用函数时，函数内部的 `this` 会指向指定参数的对象上
- 当通过上下文调用对象的时候，函数内部的 `this` 会指向调用的上下文对象
- 在箭头函数中，`this` 是由完成函数的作用域来决定的。

<LastUpdated />
