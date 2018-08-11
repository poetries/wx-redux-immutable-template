import { CALL_API } from '../middleware/api'

export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST'
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS'
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE'

export const fetchCustomers = () => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE],
      endpoint: `/v1/customers`,
      schema: 'customers',
      // query:{
      //   method:'get',
      //   data:{

      //   }
      // }
    }
  })
}