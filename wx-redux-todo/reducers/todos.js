import * as ActionTypes from '../actions/index'

const todo = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case ActionTypes.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {completed: !state.completed})
    default:
      return state
  }
}

export default (state = [], action) => {
  if (action.type === ActionTypes.ADD_TODO){
    state.push(todo(undefined, action))
    return state
  } else if (action.type === ActionTypes.TOGGLE_TODO){
    return state.map(t => todo(t, action))
  }
  return state
}