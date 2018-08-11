
const Redux = require('../public/libs/redux.js')
const combineReducers = Redux.combineReducers

const rootReducer = combineReducers({
  todos: require('./todos').default,
  visibilityFilter: require('./visibilityFilter').default,
})

module.exports = rootReducer