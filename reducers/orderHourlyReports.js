import * as ActionTypes from '../actions/index'
import { Map, List, fromJS } from '../public/libs/immutable'
import {handleEchartSeries} from '../utils/utils'

// test 
import {hourReport} from '../mock/report'

export default (state = fromJS({
  fetching: false,
  error: false,
  data:{
    list:[],
    chartSeries:[]
  }
}), action) => {

  if (action.type === ActionTypes.FETCH_ORDER_HOURLY_REPORTS_SUCCESS) {
    const {orderHourlyReports} = action.response
  
    // 按顺序处理 供table表格使用
    const list = orderHourlyReports.list?list.map(v=>({
          hour: `${String(v.hour).substr(-2)}:00`,
          bidCount: v.bidCount,
          bidRate: v.bidRate,
          impressionCount: v.impressionCount,
          clickCount: v.clickCount,
          clickRate: v.clickRate,
          downloadCount: v.downloadCount,
          downloadRate: v.downloadRate,
          cost: v.cost,
          costPerClick: v.costPerClick,
          costPerDownload: v.costPerDownload
      })):[]

    return state.merge({
      fetching: false,
      error: false,
      data:fromJS({
        list,
        chartSeries:orderHourlyReports.list?handleEchartSeries(orderHourlyReports.list):[]
      })
    })
  }else if (action.type === ActionTypes.FETCH_ORDER_HOURLY_REPORTS_REQUEST) {
    return state.merge({
      fetching: true,
      error: false
    })
  } else if (action.type === ActionTypes.FETCH_ORDER_HOURLY_REPORTS_FAILURE){
    return state.merge({
      fetching: false,
      error: true
    })
  }

  return state
}