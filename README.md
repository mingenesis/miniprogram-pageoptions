# miniprogram-pageoptions

使用自定义组件来动态设置页面的属性

[![npm version](https://img.shields.io/npm/v/miniprogram-pageoptions.svg)](https://www.npmjs.com/package/miniprogram-pageoptions)
![npm license](https://img.shields.io/npm/l/miniprogram-pageoptions.svg)

## Getting Started

该组件依赖 **微信小程序基础库 2.2.3 或以上版本**

- 一个页面可以插入多个`miniprogram-pageoptions`组件，如果多个组件都设置了同一个页面属性，则以在节点树靠后的那个组件所设置的页面属性为准；
- 目前支持动态设置的页面属性有`title` `navigationBar` `background`，分别对应的微信小程序 api 为`wx.setNavigationBarTitle` `wx.setNavigationBarColor` `wx.setBackgroundTextStyle 和 wx.setBackgroundColor`；
- 支持设置页面的分享功能；

## The Gist

```js
/* product-detail.js */
const { getPageShareContent } = require('miniprogram-pageoptions/context');
const { loadProductDetail } = require('./apis');

Page({
  data: {
    title: '商品详情页',
    shareContent: { title: '商品详情页' }
  },
  onLoad() {
    loadProductDetail().then(product => {
      const { name, posterUrl } = product;

      this.setData({
        title: name,
        shareContent: { title: name, imageUrl: posterUrl };
      });
    })
  },
  onShareAppMessage() {
    return getPageShareContent(this);
  }
})

/* product-detail.json */
{
  "usingComponents": {
    "pageoptions": "miniprogram-pageoptions"
  }
}

/* product-detail.wxml */
<pageoptions title="{{title}}" shareContent="{{shareContent}}" />
<view>商品详情...</view>
```
