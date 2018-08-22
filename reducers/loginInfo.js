import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'

export default (state = Map({
  fetching: false,
  error: false
}), action) => {

  if (action.type === ActionTypes.WECHAT_LOGIN_SUCCESS || action.type === ActionTypes.WECHAT_HAS_LOGIN) {
    const  wechatUserId = wx.getStorageSync('wechat_user_id') || '';
    const  sessionId = wx.getStorageSync('session_id') || '';

    return state.merge({
        fetching: false,
        error: false,
        wechatUserId,
        sessionId
    })
  
  }else if (action.type === ActionTypes.WECHAT_LOGIN_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.WECHAT_LOGIN_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}