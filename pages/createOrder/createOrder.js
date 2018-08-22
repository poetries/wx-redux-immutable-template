import { connect } from '../../public/libs/wx-redux'
import { createWechatOrders,fillInForm } from '../../actions/index'
import {default as config} from './config'

// 页面配置信息
const pageConfig = {
  data: {
    config,
    formInfo:{}
  },
  bindSubmit(){
    const {webSite,webName,dailyBudget,description,totalBudget} = this.data.formInfo
    if (!webSite){
      this.setData({ webSiteErr: true })
      wx.showToast({
        title:config.formInfo.webSite.topTips,
        icon:'none'
      })
    }else{
      if (!config.formInfo.webSite.reg.test(webSite)) {
        this.setData({ webSiteErr: true })
        return wx.showToast({
          title: config.formInfo.webSite.errMsg,
          icon: 'none'
        })
      } 
    }
    if(!webName){
      this.setData({ webNameErr: true })
       wx.showToast({
        title:config.formInfo.webName.topTips,
        icon:'none'
      })
    }
    if(!dailyBudget){
      this.setData({ dailyBudgetErr: true })
       wx.showToast({
        title:config.formInfo.dailyBudget.topTips,
        icon:'none'
      })
    }
    if(!totalBudget){
      this.setData({ totalBudgetErr: true })
       wx.showToast({
        title:config.formInfo.totalBudget.topTips,
        icon:'none'
      })
    }
    if(!description){
      this.setData({ descriptionErr: true })
       wx.showToast({
        title:config.formInfo.description.topTips,
        icon:'none'
      })
    }
    if (webSite && webName && dailyBudget && dailyBudget && totalBudget && description){
      this.store.dispatch(createWechatOrders())
    }
    
  },
  webSiteChange(e){
    this.setData({ webSiteErr: false })
    this.store.dispatch(fillInForm({webSite:e.detail.value}))
  },
  webSiteBlur(e) {
    let webSite = e.detail.value
    if (webSite && !config.formInfo.webSite.reg.test(webSite)) {
      this.setData({ webSiteErr: true })
      return wx.showToast({
        title: config.formInfo.webSite.errMsg,
        icon: 'none'
      })
    } else {
      this.setData({ webSiteErr: false })
    }
  },
  webNameChange(e){
    this.setData({ webNameErr: false })
    this.store.dispatch(fillInForm({webName:e.detail.value}))
  },
  webNameBlur(e) {
    if (e.detail.value) {
      this.setData({ webNameErr: false })
    }
  },
  dailyBudgetChange(e){
    this.setData({ dailyBudgetErr: false })
    if(parseInt(e.detail.value)){
      this.store.dispatch(fillInForm({dailyBudget:parseInt(e.detail.value)}))
    }else{
      this.store.dispatch(fillInForm({dailyBudget:''}))
      wx.showToast({
        title: config.formInfo.dailyBudget.errMsg,
        icon:'none'
      })
    }
  },
  dailyBudgetBlur(e) {
    if (e.detail.value) {
      this.setData({ dailyBudgetErr: false })
    }
  },
  totalBudgetChange(e){
    this.setData({ totalBudgetErr: false })
    if(parseInt(e.detail.value)){
      this.store.dispatch(fillInForm({ totalBudget:parseInt(e.detail.value)}))
    }else{
      this.store.dispatch(fillInForm({totalBudget:''}))
      wx.showToast({
        title: config.formInfo.totalBudget.errMsg,
        icon:'none'
      })
    }
  },
  totalBudgetBlur(e) {
    if (e.detail.value) {
      this.setData({ totalBudgetErr: false })
    }
  },
  descriptionChange(e){
    this.setData({ descriptionErr: false })
    this.store.dispatch(fillInForm({description:e.detail.value}))
    if (this.data.textareaValLen==50){
      return wx.showToast({
        title: config.formInfo.textLimitMsg.errMsg,
        icon:'none'
      })
    }
  },
  descriptionBlur(e) {
    if(e.detail.value){
      this.setData({ descriptionErr: false })
    }
  },
  onReady(){
    // 所有state、action都在data上
    // console.log(this);
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
    createWechatOrders,
    fillInForm
  }
)(pageConfig)

Page(nextPageConfig);