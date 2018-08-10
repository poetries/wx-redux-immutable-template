import * as ActionTypes from '../actions/index'
import { Map, fromJS, List } from '../public/libs/immutable'

export default (state = 'SHOW_ALL', action) => {
  if (action.type === ActionTypes.SET_VISIBILITY_FILTER){
    return action.filter
  }
  return state
}
