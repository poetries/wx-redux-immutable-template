
## 微信小程序集成Redux-template

## 使用方法

- 导入`wx-redux-template`到微信开发者工具
- 在`wx-redux-template`下`middleware/api.js`搜索`@todo`修改对应地址信息

## 特性

- 支持`redux-devtools`
- 支持中间件`thunk`
- 封装了请求的中间件
- 支持`promise`，请求方法挂载到`wx.pro`下`wx.pro.request().then().catch().finally()`


**开启redux-devtools**

> 本地安装`remotedev-server`并启动

```shell
   npm install -g remotedev-server
   remotedev --hostname=localhost --port=5678
```

> 浏览器中访问`localhost:5678`

![remote-redux-devtools](https://upload-images.jianshu.io/upload_images/1480597-54032e17cab3dc21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 如果不能访问，可以尝试使用`http://remotedev.io/local/`，打开后点击下面的`setting`，设置使用本地的`server`

> 集成`redux`方法文章 http://blog.poetries.top/2018/08/11/wx-redux

### Liscense

© 2018  [poetries](http://blog.poetries.top)
