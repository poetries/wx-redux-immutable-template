Page({
    data: {
        icon: {
            type: 'warn',
            color: '#ef473a',
        },
        buttons: [{
                type: 'balanced',
                block: true,
                text: '确定',
            }
        ],
    },
    onReady(){
        this.setData({price:this.options.price})
    },
    onClick(e) {
        const { index } = e.detail
        
        wx.reLaunch({ url: '/pages/index/index' })
    }
})