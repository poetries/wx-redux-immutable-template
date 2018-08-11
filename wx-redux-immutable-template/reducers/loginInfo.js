import * as ActionTypes from '../actions/index'
import { Map } from '../public/libs/immutable'

//@todo 特殊处理
export default (state = Map({}), action) => {
	if (action.type === ActionTypes.LOGIN_SUCCESS) {

		// const accountId = window.location.pathname.split('/')[1]
		const accountId = ''

			// const {data:auth} = keys
		let auth = wx.getStorageSync('auth')
		if (!auth||!auth.data)return state
		let accountKeyStr = 'userAccount|'
		const {data : {id,token}} = auth
		if(auth && id){
			accountKeyStr += id + '|' + accountId
		}
		const accountStr = wx.getStorageSync(accountKeyStr) 

		if (accountStr && accountStr.length) {
			const account = accountStr
				const {data: {accountName, sign}} = account
				return state.merge({
					accountId,
					accountName,
					token,
					sign,
					userId : id
				})
		}
		return state.merge({
			accountId,
		})

	} else if (action.type === ActionTypes.LOGOUT_SUCCESS) {
		wx.clearStorageSync()
		window.location.href = '/'
	}
	return state
}
