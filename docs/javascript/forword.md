---
title: 常用功能
---

## 数组中根据指定key值排序
```js
const compare = (key) => {
  return (obj1, obj2) => {
    let value1 = obj1[key]
    let value2 = obj2[key]
    if (value1 < value2) {
      return 1;
    } else if (value1 > value2) {
      return -1;
    } else {
      return 0
    }
  }
}
 
let data = [
  { label: '一一一', value: 111},
  { label: '三三三', value: 333},
  { label: '二二二', value: 222},
]
 
console.log(data.sort(compare(`value`)))
```

##  JavaScript数组去重—ES6的几种方式
```js
function unique(arr){
    //定义常量 res，值为一个Map对象实例
    const res=new Map();
    //过滤条件是，如果res中没有某个健，就设置这个键为1
    return arr.filter((a)=>!res.has(a) && res.set(a,1));
}
```
```js
function unique(arr){
    //通过Set对象，对数组去重，结果又返回一个Set对象
    //通过from方法，将Set对象转为数组
    return Array.from(new Set(arr)));
}
```
```js
[...new Set(arr)];

var arr=[1,1,2,"1"];
[...new Set(arr)]; //[1,2,"1"]
```

（多维数组去重）
```js
let obj = {}；
data.map(item=>{
    item.data = item.data.reduce((cur, next) => {
        obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
        return cur；
    }, [])
});
```
一维数组：
```js
let obj = {};

person = person.reduce((cur,next) => {
    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
    return cur;
},[]) 
//设置cur默认类型为数组，并且初始值为空的数组
```

## 复制到剪贴板
将字符串复制到剪贴板。仅作为用户操作的结果（即在click事件侦听器内）起作用。<br />

创建一个新`<textarea>`元素，用提供的数据填充它并将其添加到 HTML 文档中。<br />
使用Selection.getRangeAt()存储选择的范围（如果有的话）。<br />
使用Document.execCommand('copy')复制到剪贴板。<br />
`<textarea>`从 HTML 文档中删除该元素。<br />
最后，用于Selection().addRange()恢复原始选定范围（如果有）。<br />
⚠️注意：使用新的异步剪贴板 API 可以轻松实现相同的功能，该 API 仍处于实验阶段，<br />
但应在将来使用，而不是此代码段。在此处了解更多信息。<br />
```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard. 
```