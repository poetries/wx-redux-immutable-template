import {fetchWechatOrders} from  './index'

export const FILLIN = 'FILLIN'

export const fillInForm = (obj) => (dispatch, getState) => {

	setTimeout(()=>{
		if(obj.loadMoreCount){
			dispatch(fetchWechatOrders())
		}
	},300)
	dispatch({
		obj,
		type: FILLIN
	})

}
