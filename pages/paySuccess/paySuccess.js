Page({
    data: {
        buttons: [{
                type: 'balanced',
                block: true,
                text: '确定'
            },
            {
                type: 'light',
                block: true,
                text: '创建订单',
            }
        ],
    },
    onReady(){
        this.setData({price:this.options.price})
    },
    onClick(e) {
        const {index} = e.detail
        if(index==0){
            wx.reLaunch({ url: '/pages/index/index' })
        }else{
            wx.navigateTo({ url: '/pages/createOrder/createOrder' })
        }
    },
})