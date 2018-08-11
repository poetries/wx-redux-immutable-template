export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginAfter = () => (dispatch, getState) => {

	dispatch({
		type: LOGIN_SUCCESS
	})
}
