
const Redux = require('../public/libs/redux')
import combineReducers from '../public/libs/combineReducers'

const rootReducer = combineReducers({
  customers: require('./customers').default
})

module.exports = rootReducer