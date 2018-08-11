
const Redux = require('../public/libs/redux')
const combineReducers = Redux.combineReducers

const rootReducer = combineReducers({
  customers: require('./customers').default
})

module.exports = rootReducer