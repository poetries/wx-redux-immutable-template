import * as ActionTypes from '../actions/index'

export default (state = {
  fetching: false,
  error: false,
  data: []
}, action) => {

  if (action.type === ActionTypes.FETCH_CUSTOMER_SUCCESS){
    const customers = action.response.list
    
    console.log(customers,'customers===')
    return Object.assign({}, { ...state,data: customers})
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_REQUEST) {
    return Object.assign({},{ ...state,fetching:true,data:[]})
  } else if (action.type === ActionTypes.FETCH_CUSTOMER_FAILURE) {
    return Object.assign({}, { ...state, error: true, data: [] })
  }
  return state
}