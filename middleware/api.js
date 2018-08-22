import { normalize, schema } from '../public/libs/normalizr'
import { camelizeKeys, decamelizeKeys } from '../public/libs/humps'
import {default  as eCodeMsg} from '../config/errorCode'
import {MSG_SHOW,MSG_INIT,COMMON_OVER} from '../actions/index'
import   apiConfig from '../config/apiConfig'
export const API_ROOT =  'http://'+apiConfig.apiDomain

const callApi = (endpoint, schema, query = null) => {
    let fullUrl = endpoint
    const {method = 'get', data , headers = {}} = query || {}
    const baseURL = endpoint.match('auth/logout') ? API_ROOT.slice(0, -3) : API_ROOT;

    if (method.toLowerCase() === 'get') {
        const q = decamelizeKeys(data||{})
     
        if (q && q.query_optional) {
            Object.keys(q.query_optional).forEach(v => {
                q.query_optional[v] = JSON.parse(q.query_optional[v])
            })

        }
         Object.keys(q).map(v => {
            if(v && q[v])
                return `${v}=${q[v]}`
            else
                return ''
        }).filter(v => v && v.length)
        if (fullUrl.indexOf('?') === -1) {
            fullUrl += '?'
        } else {
            fullUrl += '&'
        }
        fullUrl +=  'q=' + encodeURIComponent(JSON.stringify(q))
}

  const config = {
      url: `${baseURL}${fullUrl}`, 
      data:decamelizeKeys(data||{}),
      method,
      header: {
        'content-type': 'application/json' 
      }
  }
  if(wx.getStorageSync("session_id")){
     config.header.Cookie = `PHPSESSID=${wx.getStorageSync("session_id")}`
  }
  wx.showLoading({
    title: '加载中'
  })
  wx.showNavigationBarLoading()
  return wx.pro.request(config).then(res=>{
    
    if(res.statusCode === 204){
        return {}
    }
    const  json = camelizeKeys(res.data)

    if (json.code !== 0) {
        return Promise.reject({data:json})
    }
    if(res.statusCode === 200 && json.code==0){
       return camelizeKeys(res.data.data)
    }

  }).catch(error=>{

    wx.showToast({
      title: error.errMsg || error.data && error.data.message,
        icon: 'loading',
        duration: 1000
      })
      return Promise.reject(camelizeKeys(error)) 
  }).finally(() => {
    wx.hideNavigationBarLoading()
    wx.hideLoading()
  })

}


export const CALL_API = 'Call API'

export default store => next => action => {
    // const loginInfo = store.getState().get('loginInfo').toObject()

    const callAPI = action[CALL_API]
    
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint} = callAPI
    const {schema, types, query} = callAPI
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!schema) {
        throw new Error('Specify one of the exported Schemas.')
    }

    if (!Array.isArray(types)) {
        throw new Error('Expected an array of action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }
    // if (loginInfo && loginInfo.sessionId) {
    //     if (endpoint.indexOf('?') !== -1) {
    //         endpoint += '&'
    //     } else {
    //         endpoint += '?'
    //     }
    // }
    const [requestType, successType, failureType] = types
  
    next(actionWith({type: requestType}))

    return callApi(endpoint, schema, query).then(
        response => {
            next(actionWith({
                response: {[schema] :response},
                type: successType
            }))
            return response
        }).catch(
          error => {
            const { errMsg, statusCode} = error||{}

            wx.showToast({
              title: error.data && error.data.message || errMsg || '服务异常',
              icon: 'loading',
              duration: 1000
            })
            next(actionWith({
                type: failureType,
                response: error
            }))
            setTimeout(() => {
                next({
                    type : MSG_INIT
                })
                next({
                    type : COMMON_OVER
                })
            },1500)

            return error
        }
    )
}