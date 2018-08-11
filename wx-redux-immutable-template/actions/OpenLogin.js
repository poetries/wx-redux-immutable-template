// 完善信息@todo


import axios from 'axios'

// import crypro from 'crypto-js'
import md5 from 'md5'
import {JSEncrypt} from 'jsencrypt'
// import base64 from 'js-base64'
const PKEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDGx3BPOc6T4mHV3syeLKL92DjK
n7W//w4wjXH+F/CP0S8SEuJ/JLYoo79/DgPz7i6odx+OxmWQO2WPK7aDLauJLczn
m3Xp/Ek31PDcsEZWJvLyAEgP8wfWnLD7CGsAXhE0b50PMZ5C8/zoN3j+wop6e/Rv
ww8+cvkfYTCdLzugLQIDAQAB
-----END PUBLIC KEY-----`

export const userAccountKey = 'userAccount'
export const PStoreKey = '_P_stored_keys_'
export const loadCodeUrl = (host) => `//${host}/v1/logins/captcha?refresh=1&q=${encodeURIComponent(JSON.stringify({"refresh": 1}))}&user_id=&account_id=&sign=&access_token=`

export const loadCode = (host) => () => {
	return new Promise((resolve, reject) => {
		axios.get(`//${host}/v1/logins/captcha?refresh=1&q=${encodeURIComponent(JSON.stringify({"refresh": 1}))}&user_id=&account_id=&sign=&access_token=`,
			{
				withCredentials: true
			}
		).then(response => {
			if (response.status === 200) {
				const r = response.data
				if (r.code === 0) {
					resolve(`//${host}/${r.data.url}`)
				} else {
					reject(r)
				}
			}
		})
	})
}

export const doLogin = (appDomain,oAuthDomain,appClientId,state,setStorageItem) =>(email, password, captcha) => {
	const pt = `${md5(password)},${(new Date()).getTime() / 1000},${Math.random()}`
	const encrypt = new JSEncrypt()
	encrypt.setPublicKey(PKEY)
	console.log('pt:',pt)
	const data = {
		email ,
		// password: "hjlrrUF41RRv%2FvNy2m66uCHbaUVqqiR03a7e6jp81NUv%2FmwRufzciINAbM3P6nTZD98PVyUqJiYOQghXHC3mvu5jidsQETq7zaGaLdOjz1EwudlxuumdhFLYlFXay%2BpJCLF6Gf6d%2BdorVRawtcRuGF%2BJN%2BSDuFzi0QDBcthBDk4%3D"
		//"WGSLGi0Yaj0Sw%2B3qZoy7f8dx5SktVpIK2jt%2FlmGrZuidvuaNNlH9KvH5p8n98jUL28BiP%2FDDOAaKnC%2BHKmnUJtuoCQv4iWsJkXMhfaSTmFKGn4LOD5Z0VDz77hEmJAJTpx2qTVPGo%2Fjy1gqVHbWR5CbwuPSr1g32EFwfoHTQS50%3D" ,
		password : encodeURIComponent(encrypt.encrypt(pt)),
		captcha,
		client_id: appClientId,
		login_type: 1,
		redirect_uri: encodeURIComponent(`http://${appDomain.replace(/api\./,'')}/auth/connect`),//'http%3A%2F%2Fe.yesdat.com%2Fauth%2Fconnect',
		sms_code: '',
		state
	}
	let loginObj
	let access_token
	return new Promise((resolve, reject) => {
		console.log('ps',data.password)
		axios.post(`//${oAuthDomain}/v1/logins?user_id=&account_id=&sign=&access_token=`, data,{
			withCredentials : true
			}).then(response => {
			console.log('res0',response)
			if (response.status !== 200 || response.data.code !== 0) {
				return reject(response.data)
			}
			// const redirect_uri = response.data.data.redirect_uri.replace(appDomain,host) + '&format=json'
			const redirect_uri = response.data.data.redirect_uri + '&format=json'
			return axios.get(redirect_uri, {
				maxRedirects: 0,
				withCredentials: true
			})
		}).then((res) => {
			if (res && res.status === 200 && res.data.code === 0) {

				const {user_id , expires_at} = res.data.data
				access_token = res.data.data.access_token
				return axios.get(`//${appDomain}/account/user-accounts?user_id=${user_id}&q=${encodeURIComponent(JSON.stringify({"user_id": user_id}))}&page_size=1000&account_id=&sign=&access_token=${access_token}`)

			}
			return reject()
		}).then(res => {
			console.log('res2',res)
			if (!res || res.status !== 200 || !res.data) {
				return reject()
			} else {
				const d = res.data
				if (d.code === 0) {

					if(d.data.list
					 // && d.data.list.length === 1
					){
						const {user_id,account_id,account_name} = d.data.list[0]
						const obj = {
							user_id,
							account_id,
							sign : ''
						}
						loginObj = d.data.list[0]
						loginObj.userId = user_id
						return axios.put(`//${appDomain}/account/user-accounts/${account_id}?user_id=${user_id}&account_id=${account_id}&sign=&access_token=${access_token}`
							,obj)


					} else {
						return d.data.list
					}
				} else {
					return reject(d)
				}
			}
		}).then(res => {
			console.log('res3',res)
			const {user_id,account_name,account_id} = loginObj
			if(res.status === 200 && res.data.code === 0){
				setStorageItem('auth', JSON.stringify({
					data : {

					id: user_id,
					token: access_token
					}
				}))
				setStorageItem(PStoreKey, JSON.stringify({
					data : {
						[`userAccount|${user_id}|${account_id}`] : 1,
						auth : 1
					}
				}))
				const accountData = {
					data : {
						accountId : account_id,
						accountName: account_name,
						sign: res.data.data.sign,
						token: access_token,
						userId : user_id
					}
				}
				setStorageItem(`userAccount|${user_id}|${account_id}`, JSON.stringify(accountData))
				return resolve(accountData)
			}
			return reject(res)
		}).catch(e => {
			console.log('e',e)
			return reject(e)
		})

	})
}

