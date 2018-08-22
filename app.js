import './utils/wxPromise.min.js'
import { Provider } from './public/libs/wx-redux';
import configureStore from './store/configureStore';
import { loginAfter,WECHAT_HAS_LOGIN} from "./actions/index";

App(Provider(configureStore())({
  globalData:{
    wechatUserId:null
  },
  onLaunch: function () {
       // 注册当前用户
       this.login()
  },
  login: function() {
    let _this = this

    let loginTime = parseInt(wx.getStorageSync('LOGIN_TIME'))

     // 每隔20分钟重新获取登录态
    if(loginTime && ((Date.now()-loginTime)/1000) < 1200){
     //已经登录过
     _this.store.dispatch({type:WECHAT_HAS_LOGIN})
    }else{
        wx.checkSession({
            success: (res) => {
                console.log('warning wx.checkSession OK, but no wechatUserId', res);
            },
            fail: (res) => {
                console.log('wx.checkSession failed:', res);
            },
            complete: () => {
                wx.login({
                    success: (res) => {
                        console.log('wx.login success:', res);
                        
                        // 登录自有系统
                       _this.store.dispatch(loginAfter(res.code))
                    },
                    fail: (res) => {
                        console.log('wx.login failed:', res);
                    }
                })
            }
    });
    }
   
   
}
}))