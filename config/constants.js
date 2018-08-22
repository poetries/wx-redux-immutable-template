import moment from '../public/libs/moment.min'

export const  ORDER_STSTUS = {
    1:{msg:'待支付',color:'#f08d49'},       
    2:{msg:'已支付',color:'#57bb6f'},       
    3:{msg:'确认接单',color:'#005cc5'},       
    4:{msg:'执行中',color:'#e6dc26'},       
    5:{msg:'订单完成',color:'#2c961c'},       
    '-1':{msg:'订单取消',color:'#b31d28'}
}

export const PAGE_SIZE = 5 //上拉每次加载五条数据

export const DATA = {
	DATE_TODAY: moment().format('YYYY-MM-DD'),
	DATE_YESTERDAY: moment().subtract(1, 'days').format('YYYY-MM-DD'),
	DATE_1_WEEK_BEFORE: moment().subtract(1, 'weeks').format('YYYY-MM-DD'),
	DATE_2_WEEKS_BEFORE: moment().subtract(2, 'weeks').format('YYYY-MM-DD'),
	DATE_3_WEEKS_BEFORE: moment().subtract(3, 'weeks').format('YYYY-MM-DD'),
	DATE_1_MONTH_BEFORE: moment().subtract(1, 'months').format('YYYY-MM-DD'),
	DATE_2_MONTH_BEFORE: moment().subtract(2, 'months').format('YYYY-MM-DD'),
	DATE_3_MONTHS_BEFORE: moment().subtract(3, 'months').format('YYYY-MM-DD'),
	DATE_1_YEAR_BEFORE: moment().subtract(1, 'years').format('YYYY-MM-DD'),

	DATE_3_MONTHS_AFTER: moment().add(3, 'months').format('YYYY-MM-DD'),
	DATE_1_YEAR_AFTER: moment().add(1, 'year').format('YYYY-MM-DD'),

	DATE_FIRST_DAY_OF_MONTH: moment().startOf('month').format('YYYY-MM-DD'),
	DATE_LAST_DAY_OF_MONTH: moment().endOf('month').format('YYYY-MM-DD'),

	DATE_7_DAYS_BEFORE: moment().subtract(7, 'days').format('YYYY-MM-DD'),
	DATE_30_DAYS_BEFORE: moment().subtract(30, 'days').format('YYYY-MM-DD'),
	DATE_90_DAYS_BEFORE: moment().subtract(90, 'days').format('YYYY-MM-DD'),
	DATE_100_DAYS_BEFORE: moment().subtract(100, 'days').format('YYYY-MM-DD'),
}

// 小时 日报表
export const REPORT_MAP = [
    {
        key:'bidCount',
        label:'竞价数'
    },
    {
        key:'bidRate',
        label:'竞价率'
    },
    {
        key:'impressionCount',
        label:'曝光'
    },
    {
        key:'clickCount',
        label:'点击数'
    },
    {
        key:'clickRate',
        label:'点击率'
    },
    {
        key:'downloadCount',
        label:'下载'
    },
    {
        key:'downloadRate',
        label:'下载率'
    },
    {
        key:'cost',
        label:'花费'
    },
    {
        key:'costPerClick',
        label:'点击均价'
    },
    {
        key:'costPerDownload',
        label:'下载均价'
    }
]
