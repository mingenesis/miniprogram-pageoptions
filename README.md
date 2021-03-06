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

## API Reference

#### `<pageoptions />` from "miniprogram-pageoptions" - 动态设置页面属性

- `title` : String - 设置导航条的标题
- `navigationBar` : String - 设置导航条的颜色，格式为 `"[前景色] [背景色]"` ，例如 `"#000000 #ffffff"`
- `background` : String - 设置背景的字体样式和背景色，格式为 `"[字体样式] [背景色] [顶部背景色] [底部背景色]"`，例如 `"dark #ffffff #ffffff #ffffff"`
- `shareContent` : Object - 设置页面的分享内容

#### `getPageShareContent` from "miniprogram-pageoptions/context" - 获取页面的分享内容

- @params `inst` - 所在页面的实例
- @return `shareContent` - 页面的分享内容
