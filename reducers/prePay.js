import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'

export default (state = fromJS({
  fetching: false,
  error: false,
  data: fromJS([])
}), action) => {

  if (action.type === ActionTypes.PRE_PAY_SUCCESS) {
    const {prePay} = action.response
  
    return state.merge({
      fetching: false,
      error: false,
      data: fromJS(prePay)
    })
  } else if (action.type === ActionTypes.PRE_PAY_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.PRE_PAY_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}