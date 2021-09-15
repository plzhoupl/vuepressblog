---
title: css效果
---

## 在悬停时显示其他内容
创建一个在悬停时显示附加内容的卡片。<br />

· overflow: hidden在卡片上使用以隐藏垂直溢出的元素。<br />
· 使用:hover和:focus-within伪类选择器在卡片悬停或它或其内容被聚焦时根据需要更改卡片的样式。<br />
· 设置transition: 0.3s ease all为在悬停/焦点上创建过渡效果。<br />

```js
HTML
<div class="card">
  <img src="https://picsum.photos/id/404/367/267"/>
  <h3>Lorem ipsum</h3>
  <div class="focus-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> 
    <a href="#">Link to source</a>
    </p>
  </div>
</div>
```

```js
.card {
  width: 300px;
  height: 280px;
  padding: 0;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.card * {
  transition: 0.3s ease all;
}

.card img {
  margin: 0;
  width: 300px;
  height: 224px;
  object-fit: cover;
  display: block;
}

.card h3 {
  margin: 0;
  padding: 12px 12px 48px;
  line-height: 32px;
  font-weight: 500;
  font-size: 20px;
}

.card .focus-content {
  display: block;
  padding: 8px 12px;
}

.card p {
  margin: 0;
  line-height: 1.5;
}

.card:hover img, .card:focus-within img {
  margin-top: -80px;
}

.card:hover h3, .card:focus-within h3 {
  padding: 8px 12px 0;
}
```