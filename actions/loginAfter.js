import { CALL_API } from '../middleware/api'
import { fetchWechatOrders} from './index'
export const WECHAT_LOGIN_REQUEST = 'WECHAT_LOGIN_REQUEST'
export const WECHAT_LOGIN_SUCCESS = 'WECHAT_LOGIN_SUCCESS'
export const WECHAT_LOGIN_FAILURE = 'WECHAT_LOGIN_FAILURE'

export const WECHAT_HAS_LOGIN = 'WECHAT_HAS_LOGIN'

// 登录微信
export const loginAfter = (code) => (dispatch, getState) => {

    return dispatch({
      [CALL_API]: {
        types: [WECHAT_LOGIN_REQUEST, WECHAT_LOGIN_SUCCESS, WECHAT_LOGIN_FAILURE],
        endpoint: `/v1/wechat-logins`,
        schema: 'wechatLogin',
        query:{
          method:'post',
          data:{
            code
          }
        }
      }
    }).then(res=>{
		if (res && res.sessionId && res.wechatUserId) {
      console.log(' login success:', res);
      
			wx.setStorageSync('wechat_user_id', res.wechatUserId);
      wx.setStorageSync('session_id', res.sessionId);
      wx.setStorageSync('needLogin', false);
      wx.setStorageSync('LOGIN_TIME',Date.now()) 

      // 登录以后才能获取数据
      dispatch(fetchWechatOrders())
		} else {
			console.error('get wechat_user_id error');
		}
	})
  }