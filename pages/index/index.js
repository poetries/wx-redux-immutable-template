import { connect } from '../../public/libs/wx-redux'
import { fetchWechatOrders,fillInForm} from '../../actions/index'
import {PAGE_SIZE} from  '../../config/constants'

// 页面配置信息
const pageConfig = {
  data: {
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    position: 'bottomRight',
    colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
    theme:'balanced',
    formInfo:{},
    wechatOrders:[]
  },
  bindchange(e) {
    wx.navigateTo({
      url: '/pages/createOrder/createOrder'
    })
  },
  bindSkipDetail(e){
    const {item} = e.currentTarget.dataset
    // @todo 后面去掉 !暂时测试
    if(item.canSeeReport){
      wx.navigateTo({
        url:`/pages/orderDetail/orderDetail?orderId=${item.orderId}&webName=${item.webName}`
      })
    }else{
      wx.navigateTo({
        url:`/pages/payPreview/payPreview?orderInfo=${JSON.stringify(item)}`
      })
    }
  },
  onReady(){
   this.fetchOrders()
  },
  onReachBottom(){
    this.loadMore()
  },
  loadMore(){
    const { loadMoreCount, orderListTotalCount } = this.data.formInfo
    if (loadMoreCount >= orderListTotalCount) {
      this.store.dispatch(fillInForm({ hasNoMoreData: true, isHideLoadMore: false }))
    } else {
      this.store.dispatch(fillInForm({
        loadMoreCount: `${parseInt(loadMoreCount) + PAGE_SIZE}`,
        hasNoMoreData: false
      }))
    }
  },
  // 系统方法
  // onPullDownRefresh(){
  //   this.fetchOrders()
  // app.json window 开启"enablePullDownRefresh": true生效 
  // },
  fetchOrders(){
    this.fetchWechatOrders()
  },
  onPulling() {
    // console.log('onPulling')
  },
  onRefresh() {
    this.loadMore()
    setTimeout(() => this.fetchOrders(),500)
  }
}

// 传入state
const mapStateToData = state =>{
  return {
    wechatOrders: state.get('wechatOrders').toJS(),
    formInfo: state.get('formInfo').toObject()
  }
}

const nextPageConfig = connect(
  mapStateToData,
  // 传入action
  {
    fetchWechatOrders
  }
)(pageConfig)

Page(nextPageConfig);