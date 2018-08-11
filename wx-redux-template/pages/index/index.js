import { connect } from '../../public/libs/wechat-weapp-redux'
import { fetchCustomers } from '../../actions/index'

// 页面配置信息
const pageConfig = {
  data: {
    customers:[]
  },
  handleClick(){
    // this.fetchCustomers()
  },
  onReady(){
    // 所有state、action都在data上
    console.log(this);
  }
}

// 传入state、action
const mapStateToData = state =>({
  customers: state.customers.data
})

const nextPageConfig = connect(
  mapStateToData,{
    fetchCustomers
  }
)(pageConfig)

Page(nextPageConfig);