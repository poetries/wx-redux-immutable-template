/**
 * Created by zorochen on 2017/8/7.
 */

export const MSG_SHOW = 'MSG_SHOW'
export const MSG_INIT = 'MSG_INIT'
export const POP_LOGIN = 'POP_LOGIN'
export const popLogin = () => ({
	type: POP_LOGIN
})

export const initMsg = () => ({type : MSG_INIT})