export default  {
  // 基础类型输入框配置
  formInfo: {
    webSite: {
      focus: true,
      error:true,
      title: '推广链接',  
      mode: 'wrapped',
      placeholder: '请输入推广链接',
      topTips:'推广链接不能为空',
      errMsg:'推广链接不合法',
      reg: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
    },
    webName: {  
      title: '推广名称',
      error: true,
      mode: 'wrapped',
      placeholder: '请输入推广名称',
      topTips:'推广名称不能为空'
    },
    dailyBudget: {
      title: '日限额',  
      right: true,
      error: true,
      mode: 'wrapped',
      inputType: 'number',
      placeholder: '请输入日限额(元)',
      topTips:'日限额不能为空',
      errMsg:'请输入合法整数'
    },
    totalBudget: {
      title: '总预算',
      inputType: 'number',  
      right: true,
      error: true,
      mode: 'wrapped',
      placeholder: '请输入总预算(元)',
      topTips:'总预算不能为空',
      errMsg:'请输入合法整数'
    },
    description: {
      title: '文案',
      error: true,
      type: 'text', 
      mode: 'wrapped',
      placeholder: '请输入文案(最多50字)',
      topTips:'文案不能为空',
      textLimitMsg:'最大可输入50个字'
    }
  }
};
