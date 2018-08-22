/**
 * 使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象
 * @param {String} selector 节点选择器
 * @param {Object} ctx 页面栈或组件的实例，默认为当前页面栈实例
 */
export const getCtx = (selector, ctx = getCurrentPages()[getCurrentPages().length - 1]) => {
    const componentCtx = ctx.selectComponent(selector)

    if (!componentCtx) {
        throw new Error('无法找到对应的组件，请按文档说明使用组件')
    }

    return componentCtx
}

// 生成小时分钟列表 
export const getTimeList = ()=>{  
    var minutes = 60,hours=24,step=60;
    var timeArr = []   
  
    for(var i = 0; i < hours; i++){  
        var str = ''  
        if(i < 10) {  
            str = 0 + '' + i  
        } else {  
            str = '' + i  
        }  
  
        for(var j = 0; j < minutes; j++) {  
            if(j % step == 0){  
                var s = j < 10 ? ':' + 0 + '' + j : ':' +  j;  
                s = str + s  
                timeArr.push(s)  
            }  
        }  
    }  
  
    return timeArr;  
  
}  

export const handleEchartSeries = arr=>{
    var keys = Object.keys(arr[0]),newArr = []
    if(!arr.length)return;

    arr.map(v=>({...v,hour:`${String(v.hour).substr(-2)}:00`})).forEach(v=>{
        keys.forEach(vv=>{
            newArr.push({
                key:vv,
                val: v[vv]!=='-' ? ( String(v[vv]).indexOf('%')!==-1?parseFloat(v[vv]):v[vv]):0
            })
        })
    })
    return newArr
}

