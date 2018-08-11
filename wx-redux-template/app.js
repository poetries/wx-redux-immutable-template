//app.js
import './utils/wxPromise.min.js'
import {Provider} from './public/libs/wechat-weapp-redux';
import configureStore from './store/configureStore';

App(Provider(configureStore())({
  onLaunch: function () {
    
  }
}))