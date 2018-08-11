import { normalize, schema } from '../public/libs/normalizr'
import { camelizeKeys, decamelizeKeys } from '../public/libs/humps'
import * as eCodeMsg from '../config/errorCode'
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
    url: `https://easy-mock.com/mock/5a535c5390626970a9649c4c/crm/v1/recharge-reports`,//@todo 测试地址 
    // url: `${baseURL}${fullUrl}`, // 打开正式开发这行
      data,
      method,
      header: {
        'content-type': 'application/json' // 默认值
      }
  }

  return wx.pro.request(config).then(res=>{
    
    if(res.statusCode === 204){
        return {}
    }
    let  json = ''
    if(res.statusCode === 200){
         json = camelizeKeys(res.data)
    }

    if (json.code !== 0) {
        return;
    }

    return camelizeKeys(json.data)
    
  }).catch(err=>{
      // 这里组件修改一下 @todo
    wx.showToast({
        title: err.errMsg,
        icon: 'loading',
        duration: 1000
      })
  })

}


export const CALL_API = 'Call API'

export default store => next => action => {
    // //@todo 根据业务修改这里 拿到登录信息
    // const loginInfo = store.getState().get('loginInfo').toObject()
    const {loginInfo} = store.getState()
    const callAPI = action[CALL_API]
    const {popUpMsgWhenSuccess} = action
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
    if (loginInfo && loginInfo.sign && loginInfo.token) {
        if (endpoint.indexOf('?') !== -1) {
            endpoint += '&'
        } else {
            endpoint += '?'
        }
        endpoint += `sign=${loginInfo.sign}&access_token=${loginInfo.token}&account_id=${loginInfo.accountId}&user_id=${loginInfo.userId}`
    }
    
    const [requestType, successType, failureType] = types
  
    next(actionWith({type: requestType}))

    return callApi(endpoint, schema, query).then(
        response => {
            next(actionWith({
                response,
                type: successType
            }))
            
            return response
        }).catch(
        error => {
            const {code,message, status} = (error||{}).data||{}
            if (status === 401) {
                if (apiConfig.debug) {
                    next(popLogin())
                } else {
                    window.location = '/'
                }
            }
            //@todo
            wx.showToast({
                title: message || '服务异常',
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