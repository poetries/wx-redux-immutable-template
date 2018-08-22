import api from '../middleware/api'
import thunk from '../public/libs/thunk'

const { createStore, compose,applyMiddleware } = require('../public/libs/redux');
const devTools = require('../public/libs/remote-redux-devtools').default;
const rootReducer = require('../reducers/index')

/**在浏览器中调试 redux 
 * npm install -g remotedev-server
 * remotedev --hostname=localhost --port=5678
 * 浏览器中访问localhost:5678 如果不能访问，可以尝试使用**http://remotedev.io/local/**，打开后点击下面的setting，设置使用本地的server
 */
export default (preloadedState)=> {
  return createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, api), devTools({
      hostname: 'localhost',
      port: 5678,
      secure: false
    }))
  );
}

