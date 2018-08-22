import { connect } from '../../public/libs/wx-redux'
import { fillInForm,prePay} from '../../actions/index'

// 页面配置信息
const pageConfig = {
  data: {
  },
  onReady(){
    const orderInfo = JSON.parse(this.options.orderInfo)
    this.setData({orderInfo})
    wx.setNavigationBarTitle({ title: `订单 ${orderInfo.orderId}` }) 
  },
  comfimPay(){
    this.store.dispatch(prePay(JSON.parse(this.options.orderInfo)))
  }
}

// 传入state
const mapStateToData = state =>{
  return {
      formInfo: state.get('formInfo').toObject() 
  }
}

const nextPageConfig = connect(
  mapStateToData,
  // 传入action
  {
    fillInForm,
    prePay
  }
)(pageConfig)

Page(nextPageConfig);