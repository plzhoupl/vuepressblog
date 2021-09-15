---
title: 经典JS手写题
---
::: tip 提示
深拷贝、防抖节流、继承、原型···一听就瑟瑟发抖？汇总以下手写题目帮你扩展并巩固自己的JS基础，顺便搞定常考手写题。在工作时运用到项目中，可以提高项目开发效率。一起学习鸭～
:::

## 1.手写call
◦ 第一个参数为null或者undefined时，this指向全局对象window，值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean <br />
◦ 为了避免函数名与上下文(context)的属性发生冲突，使用Symbol类型作为唯一值 <br />
◦ 将函数作为传入的上下文(context)属性执行 <br />
◦ 函数执行完成后删除该属性 <br />
◦ 返回执行结果
``` js
Function.prototype.myCall = function(context,...args){
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol() 
  cxt[func] = this;
  args = args ? args : []
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  //删除该方法，不然会对传入对象造成污染（添加该方法）
  delete cxt[func];
  return res;
}
``` 
## 2.手写apply
◦ 前部分与call一样 <br />
◦ 第二个参数可以不传，但类型必须为数组或者类数组 <br />
``` js
Function.prototype.myApply = function(context,args = []){
  let cxt = context || window;
  //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
  //新建一个唯一的Symbol变量避免重复
  let func = Symbol()
  cxt[func] = this;
  //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
  const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
  delete cxt[func];
  return res;
}
```
## 3.手写bind
需要考虑：<br />
◦ bind() 除了 this 外，还可传入多个参数；<br />
◦ bind 创建的新函数可能传入多个参数；<br />
◦ 新函数可能被当做构造函数调用；<br />
◦ 函数可能有返回值；<br />
实现方法：<br />
◦ bind 方法不会立即执行，需要返回一个待执行的函数；（闭包）<br />
◦ 实现作用域绑定（apply）；<br />
◦ 参数传递（apply 的数组传参）；<br />
◦ 当作为构造函数的时候，进行原型继承；<br />
``` js
Function.prototype.myBind = function (context, ...args) {
  //新建一个变量赋值为this，表示当前函数
  const fn = this
  //判断有没有传参进来，若为空则赋值[]
  args = args ? args : []
  //返回一个newFn函数，在里面调用fn
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs)
    }
    return fn.apply(context, [...args,...newFnArgs])
  }
}
</script>
```
测试：<br />
``` js
let name = '粥粥',age =18;
let obj = {
  name:'皮卡丘',
  age: this.age,
  myFun: function(from,to){
    console.log(this.name + ' 年龄 ' + this.age+'来自 '+from+'去往'+ to)
  }
}
let db = {
  name: '蓝胖纸',
  age: 9
}

//结果
obj.myFun.myCall(db,'北京','上海');     // 蓝胖纸 年龄 9  来自 北京去往上海
obj.myFun.myApply(db,['北京','上海']);      // 蓝胖纸 年龄 9  来自 北京去往上海
obj.myFun.myBind(db,'北京','上海')();       // 蓝胖纸 年龄 9  来自 北京去往上海
obj.myFun.myBind(db,['北京','上海'])();   // 蓝胖纸 年龄 9  来自 北京, 上海去往 undefined
</script>
```

## 4.ES6继承
```js
//class 相当于es5中构造函数
//class中定义方法时，前后不能加function，全部定义在class的protopyte属性中
//class中定义的所有方法是不可枚举的
//class中只能定义方法，不能定义对象，变量等
//class和方法内默认都是严格模式
//es5中constructor为隐式属性
class People{
  constructor(name='wang',age='27'){
    this.name = name;
    this.age = age;
  }
  eat(){
    console.log(`${this.name} ${this.age} eat food`)
  }
}
//继承父类
class Woman extends People{ 
   constructor(name = 'ren',age = '27'){ 
     //继承父类属性
     super(name, age); 
   } 
    eat(){ 
     //继承父类方法
      super.eat() 
    } 
} 
let wonmanObj=new Woman('xiaoxiami'); 
wonmanObj.eat();

//es5继承先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.apply(this)）。 
//es6继承是使用关键字super先创建父类的实例对象this，最后在子类class中修改this。
```
## 5.防抖函数（debounce）
连续触发在最后一次执行方法，场景：输入框匹配
```js
let debounce = (fn,time = 1000) => {
    let timeLock = null

    return function (...args){
        clearTimeout(timeLock)
        timeLock = setTimeout(()=>{
            fn(...args)
        },time)
    }
}
```
## 6.节流函数（throttle）
在一定时间内只触发一次，场景：长列表滚动节流
```js
let throttle = (fn,time = 1000) => {
    let flag = true;

    return function (...args){
        if(flag){
            flag = false;
            setTimeout(()=>{
                flag = true;
                fn(...args)
            },time)
        }
    }
}
```

## 7.数组扁平化的实现(flat)
```js
let arr = [1,2,[3,4,[5,[6]]]]
console.log(arr.flat(Infinity))//flat参数为指定要提取嵌套数组的结构深度，默认值为 1
```
```js
//用reduce实现
function fn(arr){
   return arr.reduce((prev,cur)=>{
      return prev.concat(Array.isArray(cur)?fn(cur):cur)
   },[])
}
```

## 8.函数柯里化
```js
function sumFn(a,b,c){return a+ b + c};
let sum = curry(sumFn);
sum(2)(3)(5)//10
sum(2,3)(5)//10
```
```js
function curry(fn,...args){
  let fnLen = fn.length,
      argsLen = args.length;
  //对比函数的参数和当前传入参数
  //若参数不够就继续递归返回curry
  //若参数够就调用函数返回相应的值
  if(fnLen > argsLen){
    return function(...arg2s){
      return curry(fn,...args,...arg2s)
    }
  }else{
    return fn(...args)
  }
}
```

## 9.使用闭包实现每隔一秒打印 1,2,3,4
```js
for (var i=1; i<=5; i++) {
  (function (i) {
    setTimeout(() => console.log(i), 1000*i)
  })(i)
}
```

## 10.生成随机数的方法
```js
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min   
}
```

## 11.如何实现数组的随机排序
```js
let arr = [2,3,454,34,324,32]
arr.sort(randomSort)
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}
```

## 12.实现正则切分千分位（10000 => 10,000）
```js
//无小数点
let num1 = '1321434322222'
num1.replace(/(\d)(?=(\d{3})+$)/g,'$1,')
//有小数点
let num2 = '342243242322.3432423'
num2.replace(/(\d)(?=(\d{3})+\.)/g,'$1,')
```

## 13.深拷贝
```js
const deepCopy = obj => {
    // 判断是数组还是对象
    let result = typeof obj.splice === "function" ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                //如果对象的属性值为object的时候，递归调用deepClone,
                //即在吧某个值对象复制一份到新的对象的对应值中。
                result[key] = deepCopy(obj[key]);
            } else {
                //如果对象的属性值不为object的时候，直接复制参数对象的
                //每一个键值到新的对象对应的键值对中。
                result[key] = obj[key];
            }
        }
      	// 返回拷贝完成后数据
        return result;
    }
    return obj;
}
```
```js
// 使用
let data = {
    name: '严家辉',
    age: 18,
    other: {
        gender: "男"
    }
}
const a = () => {
    let data1 = deepCopy(data)
    data1.name = '隔壁小花'
    data1.other.gender = '女'
    console.log('a函数',data1)
}
const b = () => console.log('b函数',data) // 老严
a()
b()

```