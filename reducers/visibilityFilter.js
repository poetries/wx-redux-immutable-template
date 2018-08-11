import * as ActionTypes from '../actions/index'

export default (state = 'SHOW_ALL', action) => {
  if (action.type === ActionTypes.SET_VISIBILITY_FILTER){
    return action.filter
  }
  return state
}
