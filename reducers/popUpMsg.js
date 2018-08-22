import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'

export default (state = Map({}),action) => {

	if(action.type === ActionTypes.MSG_SHOW){
		const {showType,msg} = action
		return state.merge({
			showType,
			msg
		})
	}else if(action.type === ActionTypes.MSG_INIT){
		return Map({})
	}
	return state
}