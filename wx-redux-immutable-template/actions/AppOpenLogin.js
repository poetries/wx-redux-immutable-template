import {doLogin,loadCode as _loadCode,loadCodeUrl as _loadCodeUrl,userAccountKey as uKey} from './OpenLogin'

const appDomain = 'api.ops.yesdat.com'
const oAuthDomain = 'api.o.yesdat.com'
export const userAccountKey = uKey
export const appLogin = doLogin(appDomain,oAuthDomain,'6','aHR0cDovL2Jvc3NsaXRlLnllc2RhdC5jb20v',
	(key,value) => {
		try{
			console.log('value:',value)
			wx.setStorageSync(key,value)
		}catch (e){}
	}
	)
export const loadCode = _loadCode(oAuthDomain)
export const loadCodeUrl = _loadCodeUrl(oAuthDomain)