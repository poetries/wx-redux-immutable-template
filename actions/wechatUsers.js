import { CALL_API } from '../middleware/api'

export const CREATE_WECHAR_USERS_REQUEST = 'CREATE_WECHAR_USERS_REQUEST'
export const CREATE_WECHAR_USERS_SUCCESS = 'CREATE_WECHAR_USERS_SUCCESS'
export const CREATE_WECHAR_USERS_FAILURE = 'CREATE_WECHAR_USERS_FAILURE'

//  创建用户
export const wechatUsers = (openId) => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [CREATE_WECHAR_USERS_REQUEST, CREATE_WECHAR_USERS_SUCCESS, CREATE_WECHAR_USERS_FAILURE],
      endpoint: `/v1/wechat-orders`,
      schema: 'wechatUsers',
      query:{
        method:'post',
        data:{
          openId
        }
      }
    }
  })
}

export const FETCH_WECHAT_USERS_REQUEST = 'FETCH_WECHAT_USERS_REQUEST'
export const FETCH_WECHAT_USERS_SUCCESS = 'FETCH_WECHAT_USERS_SUCCESS'
export const FETCH_WECHAT_USERS_FAILURE = 'FETCH_WECHAT_USERS_FAILURE'

// 查看用户
export const fetchWechatUsers = (userId) => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [FETCH_WECHAT_USERS_REQUEST, FETCH_WECHAT_USERS_SUCCESS, FETCH_WECHAT_USERS_FAILURE],
      endpoint: `/v1/wecaht-users`,
      schema: 'wechatUsers',
      query:{
        
      }
    }
  })
}