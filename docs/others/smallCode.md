---
title: 日常小技能
---

## H5 页面在ios软键盘搜索
在开发移动端 H5 页面的时候, 做到搜索功能, ios 软键盘没有出现搜索按钮(安卓系统正常), 只有一个换行按钮
怎么让 ios 键盘也出现搜索按钮呢?

```js
<form action="javascript:return true">
  // 把# 换成 javascript:return true  就可以实现自己的搜索逻辑了
  <input v-model="inputSearch" type="search" class="input" 
  placeholder="请输入手机号码" @input.stop.prevent="handleInput">
</form>
```

## 调试 抓包工具
```js
调试/抓包工具
至于为什么要调试，啥时候需要抓包，我猜你应该知道吧。



Fiddler
介绍：个人认为是 Windows 平台最好用的抓包工具；
下载：https://www.telerik.com/fiddler
使用方式：这一篇文章写的很全，认真看完就够用了 Fiddler 抓包工具总结



Charles
介绍：Mac 一般用 Charles 的较多，其实 Charles 还有 Windows、Linux 版本，但需要收费；
下载：https://www.charlesproxy.com/
使用方式：这里有一个系列的文章（但是服务器好像不稳定，有时打不开） 抓包工具Charles的使用教程



vConsole
介绍：腾讯出品，一个轻量、可拓展、针对手机网页的前端开发者调试面板；
链接：https://github.com/Tencent/vConsole
使用方式：看看 README 就行啦



Chrome DevTools
介绍：我想应该不用多介绍了吧，主要推荐一下 Chorme Inspect ，可以用来调试 Android Webview；
使用方式：这两篇文章虽然比较老，但相对较全 
chrome inspect 远程调测：Chrome on Android之一 普通调试，chrome://inspect 
移动前端调试方案（Android + Chrome 实现远程调试），由于国内网络环境，可能会出现 
打开白屏的情况，可以看考 Chrome inspect 白屏解决方案



Wireshark
介绍：其实这个我也不熟，只是见别人用过，是一个 网络封包分析软件 ，
比如：客户端发了请求，但服务端没收到，可以用来抓取服务端网卡记录来分析；
链接：https://www.wireshark.org/
```

