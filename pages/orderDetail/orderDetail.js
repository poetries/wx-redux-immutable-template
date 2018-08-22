import { connect } from '../../public/libs/wx-redux'
import { fillInForm,fetchOrderHourlyReports} from '../../actions/index'
import {REPORT_MAP,DATA} from '../../config/constants'
import wxCharts from '../../utils/wxcharts'
import {getTimeList,handleEchartSeries} from '../../utils/utils'

const sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let lineChart = null;

// 页面配置信息
const pageConfig = {
  data: {
    REPORT_MAP,
    DATA,
    chartLegend:'竞价数',
    orderHourlyReports:{
      list:[],
      chartSeries:[]
    }
  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
        format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data 
        }
    });
  },    
  onReady(){
    var $dispatch = this.store.dispatch,
        orderId=this.options.orderId;

    $dispatch(fetchOrderHourlyReports())
    $dispatch(fillInForm({orderId}))
    wx.setNavigationBarTitle({ title: `订单 ${orderId}` }) 

    this.loadChart()
  },
  loadChart(){
    // 处理图表
    const { chartData=[], formInfo,chartLegend } = this.data
    const data = formInfo.chartData && formInfo.chartData.length ? formInfo.chartData : Array(24).fill(0)
    const categories = formInfo.categories && formInfo.categories.length ? formInfo.categories : getTimeList()
    
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories,
      animation: true,
      series: [{
        name: chartLegend,
        data,
        format: function (val) {
          return val >= 10000 ? `${(parseInt(val) / 1000)}k` : (chartLegend.indexOf('率') !== -1 ? `${val}%` : val)
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (value) {
          return value >= 1000 ? `${(parseInt(value) / 1000)}k` : (chartLegend.indexOf('率')!==-1?`${value}%`:value)
        },
        min: 0
      },
      width: 380,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    })
  },
  onChange(e) {
    const { orderHourlyReports} = this.data
    const {key,keys} = e.detail
    const chartLegend = e.detail.keys.find(v => v.key === key).title

    const chartData = orderHourlyReports?orderHourlyReports.chartSeries.filter(v=>v.key==key).map(v=>v.val):[]
    const categories = orderHourlyReports?orderHourlyReports.chartSeries.filter(v=>v.key=='hour').map(v=>v.val):[]
    
    this.setData({current: key,chartLegend})
    this.store.dispatch(fillInForm({ chartData,categories}))
    this.loadChart()
  }
}

// 传入state
const mapStateToData = state =>{
  return {
      formInfo: state.get('formInfo').toJS(),
      orderHourlyReports: state.getIn(['orderHourlyReports','data']).toJS(),
  }
}

const nextPageConfig = connect(
  mapStateToData,
  // 传入action
  {
    fillInForm,
    fetchOrderHourlyReports
  }
)(pageConfig)

Page(nextPageConfig);