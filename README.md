## wx-redux-immutable

> 小程序集成`redux`、`immutable`模板封装


## 模板

- [集成redux](./wx-redux-template)
- [集成redux-immutable](./wx-redux-immutable-template)

## 使用方法

- 导入`wx-redux-template/wx-redux-immutable-template`到微信开发者工具
- 在`wx-redux-template/wx-redux-immutable-template`下`middleware/api.js`搜索`@todo`修改对应地址信息
- 根据业务处理登录拿到`token`等信息填充到`middleware/api.js`的`loginInfo`中

> wx-redux-imutable-template模板的 actions的写法示例

```javascript
import { CALL_API } from '../middleware/api'

export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST'
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS'
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE'

// thunk写法，对应的中间件处理在middleware/api.js中
export const fetchCustomers = () => (dispatch, getState) => {

 // 在getState中拿到所有的状态 如
 // const loginInfo = const loginInfo = store.getState().get('loginInfo').toObject()
 
  return dispatch({
    [CALL_API]: {
      types: [FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE],
      endpoint: `/v1/customers`, // 请求的地址
      schema: 'customers', // 返回的数据挂载到该节点下 取得时候 const {customer} = action.response
      query:{ // 查询的参数
        method:'get', // 不传 默认get 
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
import { Map, List, fromJS } from '../public/libs/immutable'

export default (state = fromJS({
  fetching: false,
  error: false,
  data: fromJS([])
}), action) => {

  if (action.type === ActionTypes.FETCH_CUSTOMER_SUCCESS) {
    const customers = action.response

    return state.merge({
      fetching: false,
      error: false,
      data: fromJS(customers.list)
    })
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}
```

> Page页面中引用

```javascript
import { connect } from '../../public/libs/wx-redux'
import { fetchCustomers } from '../../actions/index'

// 页面配置信息
const pageConfig = {
  data: {
    customers:[]
  },
  handleClick(){
    setTimeout(()=>{
      console.log(this.data.customers.toJS())
    },1000)
    
    this.fetchCustomers()
  },
  onReady(){
    // 所有state、action都在data上
    // console.log(this);
  }
}

// 传入state
const mapStateToData = state =>{
  return {
    customers: state.getIn(['customers','data']) //直接传入遍历即可，不需要toJS()
  }
}

const nextPageConfig = connect(
  mapStateToData,
  // 传入action
  {
    fetchCustomers
  }
)(pageConfig)

Page(nextPageConfig);
```

## 特性

- 支持`redux-devtools`
- 支持`immutable`
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
