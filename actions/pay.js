import { CALL_API } from '../middleware/api'

export const PRE_PAY_REQUEST = 'PRE_PAY_REQUEST'
export const PRE_PAY_SUCCESS = 'PRE_PAY_SUCCESS'
export const PRE_PAY_FAILURE = 'PRE_PAY_FAILURE'

//  预支付准备
export const prePay = (orderInfo) => (dispatch, getState) => {

  return dispatch({
    [CALL_API]: {
      types: [PRE_PAY_REQUEST, PRE_PAY_SUCCESS, PRE_PAY_FAILURE],
      endpoint: `/v1/pre-pay`,
      schema: 'prePay',
      query:{
        data:{
            orderId:orderInfo.orderId
        }
      }
    }
  }).then(res=>{
    // 调起微信支付接口 @todo
    if(res && res.timeStamp)
        wx.requestPayment({
            timeStamp:res.timeStamp,
            nonceStr:res.nonceStr,
            package:res.package,
            signType:res.signType,
            paySign:'',//微信签名
            success:d=>{
              console.log(d,'requestPayment:ok')
              wx.redirectTo({
                url: `/pages/paySuccess/paySuccess?price=${orderInfo.price}`
              })
            },
            fail:d=>{
              console.log(d,'requestPayment:fail')
              wx.redirectTo({
                url: `/pages/payError/payError?price=${orderInfo.price}`
              })
            },
            complete:d=>{}//调用成功、失败都会执行
      })
  })
}