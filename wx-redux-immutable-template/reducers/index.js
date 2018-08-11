
import combineReducers from '../public/libs/combineReducers'
const Redux = require('../public/libs/redux')

const rootReducer = combineReducers({
     popUpMsg: require('./popUpMsg').default,
     loginInfo: require('./loginInfo').default,
     customers: require('./customers').default
})

module.exports = rootReducer