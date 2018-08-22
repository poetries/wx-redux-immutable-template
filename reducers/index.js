
import combineReducers from '../public/libs/combineReducers'
const Redux = require('../public/libs/redux')

const rootReducer = combineReducers({
     popUpMsg: require('./popUpMsg').default,
     loginInfo: require('./loginInfo').default,
     formInfo: require('./formInfo').default,

     postWechatOrder: require('./postWechatOrder').default,
     wechatOrders: require('./wechatOrders').default,
     wechatOrder: require('./wechatOrder').default,

     wechatUsers: require('./wechatUsers').default,
     postWechatUsers: require('./postWechatUsers').default,

     orderHourlyReports: require('./orderHourlyReports').default,
     orderDailyReports: require('./orderDailyReports').default,
     
     prePay: require('./prePay').default

     
})

module.exports = rootReducer