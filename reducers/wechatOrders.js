import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'
import moment from '../public/libs/moment.min'
import {ORDER_STSTUS} from  '../config/constants'

export default (state = fromJS({
  fetching: false,
  error: false,
  data: fromJS([])
}), action) => {

  if (action.type === ActionTypes.FETCH_WECHART_ORDERS_SUCCESS) {
    const {wechatOrders} = action.response
    const totalCount = wechatOrders.pagination.totalCount

    return state.merge({
      fetching: false,
      error: false,
      totalCount,
      data: fromJS(wechatOrders.list?wechatOrders.list.map(v=>{
        if(v.createdTime){
          v.createdTime = moment(v.createdTime * 1000).format('YYYY-MM-DD HH:mm') 
        }
        if(v.updatedTime){
          v.updatedTime = moment(v.updatedTime * 1000).format('YYYY-MM-DD HH:mm') 
        }
        if(v.orderStauts){
          let status = v.orderStauts
           v.canSeeReport = status==4 || status ==5
            v.orderStautsMsg = ORDER_STSTUS[status]['msg']
            v.color = ORDER_STSTUS[status]['color']
        }
        return {
          ...v
        }
      }):[])
    })
  } else if (action.type === ActionTypes.FETCH_WECHART_ORDERS_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.FETCH_WECHART_ORDERS_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}