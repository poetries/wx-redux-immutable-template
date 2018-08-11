import {normalize, schema} from 'normalizr'
import {camelizeKeys, decamelizeKeys} from 'humps'
import {MSG_SHOW, MSG_INIT, popLogin,COMMON_FETCHING,COMMON_OVER} from '../actions/'
import * as eCodeMsg from '../config/errorCode'
import axios from 'axios'
import   apiConfig from '../config/apiConfig'

export const API_ROOT =   '//'+apiConfig.apiDomain

const callApi = (endpoint, schema, query = null, isDownload = false) => {
    let fullUrl = endpoint
    let {method = 'get', data , headers = {}} = query || {}

    if (method.toLowerCase() === 'get') {
        const q = decamelizeKeys(data||{})
        if (q && q.query_optional) {
            Object.keys(q.query_optional).forEach(v => {
                q.query_optional[v] = JSON.parse(q.query_optional[v])
            })

        }
        const ps = Object.keys(q).map(v => {
            if(v && q[v])
                return `${v}=${q[v]}`
            else
                return ''
        }).filter(v => v && v.length)
        if (fullUrl.indexOf('?') === -1) {
            fullUrl += '?'
        } else {
            fullUrl += '&'
        }
        fullUrl += '&q=' + encodeURIComponent(JSON.stringify(q))
    }

    if (isDownload) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', API_ROOT + fullUrl)
        xhr.setRequestHeader('Accept', 'application/octet-stream')
        xhr.responseType = 'blob'
        xhr.send(null)

        xhr.onload = function (e) {
            if (this.status === 200 && this.readyState === 4) {
                let blob = new Blob([this.response], {type:'application/octet-stream'})
                let a = document.createElement('a')
                a.style="display:none"
                document.body.appendChild(a)

                let url = window.URL.createObjectURL(blob)
                let filename = this.getResponseHeader('content-disposition').split(' ')[1].split('=')[1].replace(/\"/g, '')
                a.href = url
                a.download = filename
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
            }
        }

        return false
    } else {
        const config = {
            method,
			withCredentials: true,
            baseURL: endpoint.match('auth/logout') ? API_ROOT.slice(0, -3) : API_ROOT,
            url: fullUrl,
            data,
            transformRequest: [
                data => {
                    if (data && (data.toString() !== '[object FormData]')) {
                        return JSON.stringify(decamelizeKeys(data))
                    }
                    return data
                }
            ],
            headers
        }

        method.toLowerCase() === 'post' && (delete config.headers)

        return axios(config).then(
            res => {
                const json = camelizeKeys(res.data)

                if (json.code !== 0) {
                    return Promise.reject({data: json})
                }
                const camelizedJson = camelizeKeys(json.data)
                if (typeof schema === 'object') {
                    return Object.assign({},
                        normalize(camelizedJson, schema)
                    )
                } else if (typeof schema === 'string') {
                    return Object.assign({}, {
                        [schema]: camelizedJson
                    }, {})
                }
                return camelizedJson
                
            },
            error => {
                return Promise.reject(camelizeKeys(error.response))
            }
        )
    }
}


export const ASYNC_ACTION = 'ASYNC_ACTION'

export default store => next => action => {
    const loginInfo = store.getState().get('loginInfo').toObject()
    const callAPI = action[ASYNC_ACTION]
    const {popUpMsgWhenSuccess} = action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint} = callAPI
    const {schema, typePrefix, query} = callAPI

    const types = [`${typePrefix}_REQUEST`,`${typePrefix}_SUCCESS`,`${typePrefix}_FAILURE`]
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    // if (!schema) {
    //     throw new Error('Specify one of the exported Schemas.')
    // }
    // if (!Array.isArray(types) || types.length !== 3) {
    if (!Array.isArray(types)) {
        throw new Error('Expected an array of action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({typePrefix}, action, data)
        delete finalAction[ASYNC_ACTION]
        return finalAction
    }
    if (loginInfo && loginInfo.sign && loginInfo.token) {
        if (endpoint.indexOf('?') !== -1) {
            endpoint += '&'
        } else {
            endpoint += '?'
        }
        endpoint += `sign=${loginInfo.sign}&access_token=${loginInfo.token}&account_id=${loginInfo.accountId}&user_id=${loginInfo.userId}`
    }

    if (types.length === 1) {
        const isDownload = true
        return callApi(endpoint, schema, query, isDownload)
    }

    const [requestType, successType, failureType] = types
    next(actionWith({type: requestType}))
    next({type:COMMON_FETCHING})

	if( query && query.data && typeof  query.data === 'function'){
		query.data = query.data(store.getState())
	}

    return callApi(endpoint, schema, query).then(
        response => {
            if (popUpMsgWhenSuccess) {
                next({
                    type: MSG_SHOW,
                    msg: popUpMsgWhenSuccess,
                    showType : 'success'
                })

                setTimeout(() => {
                    next({
                        type : MSG_INIT
                    })
                },350)
            }
            next(actionWith({
                response,
                type: successType
            }))
            setTimeout(()=>{
                next({
                    type : COMMON_OVER
                })
            },1500)

            return response
        },
        error => {
            const cm = eCodeMsg.default
            const {code,message, status} = error.data
            if (status === 401) {
                if (window.Y.DEBUG) {
                    next(popLogin())
                } else {
                    window.location = '/'
                }
            }
            next({
                type: MSG_SHOW,
                msg: cm[code] || message || '服务异常',
                showType: 'error'
            })
            next(actionWith({
                type: failureType,
                response: error
            }))
            setTimeout(() => {
                next({
                    type : MSG_INIT
                })
                next({
                    type : COMMON_OVER
                })
            },1500)

            return error
        }
    )
}