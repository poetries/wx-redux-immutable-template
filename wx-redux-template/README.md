
## 微信小程序集成Redux-template

## 使用方法

- 导入`wx-redux-template`到微信开发者工具
- 在`wx-redux-template`下`middleware/api.js`搜索`@todo`修改对应地址信息

> actions的写法示例

```javascript
import { CALL_API } from '../middleware/api'

export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST'
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS'
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE'

// thunk写法，对应的中间件处理在middleware/api.js中
export const fetchCustomers = () => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE],
      endpoint: `/v1/customers`,
      schema: 'customers',
      query:{
        method:'get',
        data:{
            // 这里写请求的参数 如
            customerId,
            filterStateus:5
        }
      }
    }
  })
}
```

> 对应reducer写法

```javascript
import * as ActionTypes from '../actions/index'

export default (state = {
  fetching: false,
  error: false,
  data: []
}, action) => {

  if (action.type === ActionTypes.FETCH_CUSTOMER_SUCCESS){
    const customers = action.response.list
    
    console.log(customers,'customers===')
    return Object.assign({}, { ...state,data: customers})
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_REQUEST) {
    return Object.assign({},{ ...state,fetching:true,data:[]})
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_FAILURE) {
    return Object.assign({}, { ...state, error: true, data: [] })
  }
  return state
}
```

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
