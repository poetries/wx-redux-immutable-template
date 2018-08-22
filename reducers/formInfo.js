import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'
import { PAGE_SIZE } from '../config/constants'

const initState = Map({
  loadMoreCount: PAGE_SIZE,
	orderListTotalCount:0,
	hasNoMoreData:false,
	isHideLoadMore:false
})
export default (state = initState, action) => {
	if(action.type === ActionTypes.FILLIN){
		return state.mergeDeep(
			fromJS(action.obj)
		)
	}
	return state

}