import './utils/wxPromise.min.js'
import { Provider } from './public/libs/wx-redux';
import configureStore from './store/configureStore';
import { loginAfter} from "./actions/index";

App(Provider(configureStore())({
  onLaunch: function () {
    // 登录系统@todo
     this.store.dispatch(loginAfter()) 
  }
}))