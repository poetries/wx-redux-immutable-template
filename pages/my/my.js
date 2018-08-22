import { connect } from '../../public/libs/wx-redux'
import { fetchCustomers } from '../../actions/index'

// 页面配置信息
const pageConfig = {
  data: {
    customers:[]
  },
  handleClick(){
    setTimeout(()=>{
      console.log(this.data.customers.toJS())
    },1000)
    
    this.fetchCustomers()
  },
  onReady(){
    // 所有state、action都在data上
    // console.log(this);
  }
}

// 传入state
const mapStateToData = state =>{
  return {
    customers: state.getIn(['customers','data']) //直接传入遍历即可，不需要toJS()
  }
}

const nextPageConfig = connect(
  mapStateToData,
  // 传入action
  {
    fetchCustomers
  }
)(pageConfig)

Page(nextPageConfig);