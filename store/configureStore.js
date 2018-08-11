const { createStore, compose } = require('../public/libs/redux');
const devTools = require('../public/libs/remote-redux-devtools').default;
const reducer = require('../reducers/index')

// function configureStore() {
//   return createStore(reducer);
// }
function configureStore() {
  return createStore(reducer, compose(devTools({
    hostname: 'localhost',
    port: 5678,
    secure: false
  })));
}

module.exports = configureStore;