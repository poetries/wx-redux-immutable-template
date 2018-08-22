import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'

export default (state = fromJS({
  fetching: false,
  error: false,
  data: fromJS([])
}), action) => {

  if (action.type === ActionTypes.FETCH_WECHART_ORDER_SUCCESS) {
    const {wechatOrder} = action.response
  
    return state.merge({
      fetching: false,
      error: false,
      data: fromJS(wechatOrder.list)
    })
  } else if (action.type === ActionTypes.FETCH_WECHART_ORDER_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.FETCH_WECHART_ORDER_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}