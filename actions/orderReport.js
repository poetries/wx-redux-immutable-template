import { CALL_API } from '../middleware/api'
import {DATA} from '../config/constants'
export const FETCH_ORDER_DAILY_REPORTS_REQUEST = 'FETCH_ORDER_DAILY_REPORTS_REQUEST'
export const FETCH_ORDER_DAILY_REPORTS_SUCCESS = 'FETCH_ORDER_DAILY_REPORTS_SUCCESS'
export const FETCH_ORDER_DAILY_REPORTS_FAILURE = 'FETCH_ORDER_DAILY_REPORTS_FAILURE'

//  天报表
export const fetchOrderDailyReports = () => (dispatch, getState) => {
  const {beginDate,endDate,orderId} = getState().get('formInfo').toObject()
  
  const data  = {
    beginDate,
    endDate,
    orderId
  }
  return dispatch({
    [CALL_API]: {
      types: [FETCH_ORDER_DAILY_REPORTS_REQUEST, FETCH_ORDER_DAILY_REPORTS_SUCCESS, FETCH_ORDER_DAILY_REPORTS_FAILURE],
      endpoint: `/v1/order-daily-reports`,
      schema: 'orderDailyReports',
      query:{
        data
      }
    }
  })
}

export const FETCH_ORDER_HOURLY_REPORTS_REQUEST = 'FETCH_ORDER_HOURLY_REPORTS_REQUEST'
export const FETCH_ORDER_HOURLY_REPORTS_SUCCESS = 'FETCH_ORDER_HOURLY_REPORTS_SUCCESS'
export const FETCH_ORDER_HOURLY_REPORTS_FAILURE = 'FETCH_ORDER_HOURLY_REPORTS_FAILURE'

//  小时报表
export const fetchOrderHourlyReports = () => (dispatch, getState) => {
  // const {beginDate,endDate,orderId} = getState().get('formInfo').toObject()

  const {orderId} = getState().get('formInfo').toObject()
  const date = DATA.DATE_TODAY.split('-').join('')

  const data  = {
    beginDate:date,
    endDate:date,
    orderId
  }
  return dispatch({
    [CALL_API]: {
      types: [FETCH_ORDER_HOURLY_REPORTS_REQUEST, FETCH_ORDER_HOURLY_REPORTS_SUCCESS, FETCH_ORDER_HOURLY_REPORTS_FAILURE],
      endpoint: `/v1/order-hourly-reports`,
      schema: 'orderHourlyReports',
      query:{
        data
      }
    }
  })
}
