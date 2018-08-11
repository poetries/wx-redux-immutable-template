import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'

export default (state = fromJS({
  fetching: false,
  error: false,
  data: fromJS([])
}), action) => {

  if (action.type === ActionTypes.FETCH_CUSTOMER_SUCCESS) {
    const customers = action.response

    return state.merge({
      fetching: false,
      error: false,
      data: fromJS(customers.list)
    })
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}