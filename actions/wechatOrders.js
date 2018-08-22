import { CALL_API } from '../middleware/api'
import {fillInForm} from './fillInForm'
import {getCtx} from '../utils/utils'
import {PAGE_SIZE} from '../config/constants'
const $stopWuxRefresher = (selector = '#wux-refresher', ctx) => getCtx(selector, ctx).finishPullToRefresh()
const $wuxToptips = (selector = '#wux-toptips', ctx) => getCtx(selector, ctx)

export const CREATE_ORDERS_REQUEST = 'CREATE_ORDERS_REQUEST'
export const CREATE_ORDERS_SUCCESS = 'CREATE_ORDERS_SUCCESS'
export const CREATE_ORDERS_FAILURE = 'CREATE_ORDERS_FAILURE'

// 创建订单
export const createWechatOrders = () => (dispatch, getState) => {
  const {webName,webSite,description,dailyBudget,totalBudget} = getState().get('formInfo').toObject()
  const  {wechatUserId} =  getState().get('loginInfo').toObject()

  return dispatch({
    [CALL_API]: {
      types: [CREATE_ORDERS_REQUEST, CREATE_ORDERS_SUCCESS, CREATE_ORDERS_FAILURE],
      endpoint: `/v1/wechat-orders`,
      schema: 'createOrder',
      query:{
        method:'post',
        data:{
          orderType : 1,
          wechatUserId,
          webName,
          webSite,
          description,
          totalBudget,
          dailyBudget
        }
      }
    }
  }).then(res=>{
    if(res&&res.orderId){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  })
}

export const FETCH_WECHART_ORDERS_REQUEST = ' FETCH_WECHART_ORDERS_REQUEST'
export const  FETCH_WECHART_ORDERS_SUCCESS = ' FETCH_WECHART_ORDERS_SUCCESS'
export const  FETCH_WECHART_ORDERS_FAILURE = ' FETCH_WECHART_ORDERS_FAILURE'
// 查询订单
export const fetchWechatOrders = () => (dispatch, getState) => {
  const {loadMoreCount,orderListTotalCount,hasNoMoreData} = getState().get('formInfo').toObject()

  return dispatch({
    [CALL_API]: {
      types: [ FETCH_WECHART_ORDERS_REQUEST,  FETCH_WECHART_ORDERS_SUCCESS,  FETCH_WECHART_ORDERS_FAILURE],
      endpoint: `/v1/wechat-orders?page_size=${loadMoreCount}`,
      schema: 'wechatOrders',
      query:{
      }
    }
  }).then(res=>{
    if(res && res.list){
      dispatch(fillInForm({
        isHideLoadMore:true,
        orderListTotalCount:res.pagination.totalCount
      }))

     
      let remainCount = loadMoreCount-res.pagination.totalCount
      // // 请求成功 停止下拉刷新
      $stopWuxRefresher()
      $wuxToptips().success({
        hidden: false,
        text: hasNoMoreData?`已是最新了`: `又发现${remainCount>0?(PAGE_SIZE-remainCount) :PAGE_SIZE}条数据`,
        duration: 1000,
        success() {},
    })
      //wx.stopPullDownRefresh()
    }else{
      wx.setStorageSync('needLogin', true);
    }

  })
}

export const FETCH_WECHART_ORDER_REQUEST = ' FETCH_WECHART_ORDER_REQUEST'
export const  FETCH_WECHART_ORDER_SUCCESS = ' FETCH_WECHART_ORDER_SUCCESS'
export const  FETCH_WECHART_ORDER_FAILURE = ' FETCH_WECHART_ORDER_FAILURE'
 // 查询单个订单
export const fetchWechatOrder = (orderId) => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [ FETCH_WECHART_ORDER_REQUEST,  FETCH_WECHART_ORDER_SUCCESS,  FETCH_WECHART_ORDER_FAILURE],
      endpoint: `/v1/wechat-orders/${orderId}`,
      schema: 'wechatOrder',
      query:{
        data:{
          orderId
        }
      }
    }
  })
}