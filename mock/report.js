import { camelizeKeys } from '../public/libs/humps'

export const hourReport = camelizeKeys([
    {
        "hour":2017072500,
        "bid_count":200,
        "impression_count":300,
        "bid_rate":"1.5%",
        "click_count":150,
        "click_rate":"0.5%",
        "download_count":"20",
        "download_rate":"0.1%",
        "cost":"50.2",
        "cost_per_click":"25",
        "cost_per_download":"5"
    },
    {
        "hour":2017072501,
        "bid_count":1000,
        "impression_count":800,
        "bid_rate":"5%",
        "click_count":130,
        "click_rate":"23%",
        "download_count":"24",
        "download_rate":"3%",
        "cost":"50.32",
        "cost_per_click":"2.4",
        "cost_per_download":"3.55"
    },
    {
        "hour":2017072502,
        "bid_count":700,
        "impression_count":200,
        "bid_rate":"1.25%",
        "click_count":10,
        "click_rate":"0.05%",
        "download_count":"2",
        "download_rate":"0.01%",
        "cost":"50.32",
        "cost_per_click":"0.35",
        "cost_per_download":"3.55"
    },
    {
        "hour":2017072503,
        "bid_count":203,
        "impression_count":389,
        "bid_rate":"1.25%",
        "click_count":10,
        "click_rate":"0.05%",
        "download_count":"2",
        "download_rate":"0.01%",
        "cost":"50.32",
        "cost_per_click":"0.35",
        "cost_per_download":"3.55"
  }, 
  {
    "hour": 2017072504,
    "bid_count": 2938,
    "impression_count": 2874,
    "bid_rate": "1.25%",
    "click_count": 10,
    "click_rate": "0.05%",
    "download_count": "2",
    "download_rate": "0.01%",
    "cost": "872",
    "cost_per_click": "0.35",
    "cost_per_download": "3.55"
  },
  {
    "hour": 2017072505,
    "bid_count": 2387,
    "impression_count": 2348,
    "bid_rate": "1.25%",
    "click_count": 10,
    "click_rate": "0.05%",
    "download_count": "2",
    "download_rate": "0.01%",
    "cost": "932",
    "cost_per_click": "0.35",
    "cost_per_download": "3.55"
  },
  {
    "hour": 2017072506,
    "bid_count": 1000,
    "impression_count": 100,
    "bid_rate": "1.25%",
    "click_count": 10,
    "click_rate": "0.05%",
    "download_count": "2",
    "download_rate": "0.01%",
    "cost": "502",
    "cost_per_click": "0.35",
    "cost_per_download": "3.55"
  },
  {
    "hour": 2017072507,
    "bid_count": 1000,
    "impression_count": 100,
    "bid_rate": "1.25%",
    "click_count": 10,
    "click_rate": "0.05%",
    "download_count": "2",
    "download_rate": "0.01%",
    "cost": "532",
    "cost_per_click": "0.35",
    "cost_per_download": "3.55"
  },
  {
    "hour": 2017072508,
    "bid_count": 1000,
    "impression_count": 100,
    "bid_rate": "1.25%",
    "click_count": 10,
    "click_rate": "0.05%",
    "download_count": "2",
    "download_rate": "0.01%",
    "cost": "1220",
    "cost_per_click": "0.35",
    "cost_per_download": "3.55"
  },
  {
    "hour": 2017072509,
    "bid_count": 1000,
    "impression_count": 100,
    "bid_rate": "1.25%",
    "click_count": 10,
    "click_rate": "0.05%",
    "download_count": "2",
    "download_rate": "0.01%",
    "cost": "5032",
    "cost_per_click": "0.35",
    "cost_per_download": "3.55"
  }
])

export const dateReport = camelizeKeys([
    {
        "date":"20170725",
        "campaign_id":"10010",
        "bid_count":1000,
        "impression_count":100,
        "bid_rate":"1.25%",
        "click_count":10,
        "click_rate":"0.05%",
        "download_count":"2",
        "download_rate":"0.01%",
        "cost":"50.32",
        "cost_per_click":"0.35",
        "cost_per_download":"3.55"
    },
    {
        "date":"20170726",
        "campaign_id":"10010",
        "bid_count":1000,
        "impression_count":100,
        "bid_rate":"1.25%",
        "click_count":10,
        "click_rate":"0.05%",
        "download_count":"2",
        "download_rate":"0.01%",
        "cost":"50.32",
        "cost_per_click":"0.35",
        "cost_per_download":"3.55"
    },
    {
        "date":"20170727",
        "campaign_id":"10010",
        "bid_count":1000,
        "impression_count":100,
        "bid_rate":"1.25%",
        "click_count":10,
        "click_rate":"0.05%",
        "download_count":"2",
        "download_rate":"0.01%",
        "cost":"50.32",
        "cost_per_click":"0.35",
        "cost_per_download":"3.55"
    }
])

export const orders = camelizeKeys({ "code": 0, "message": "success", "data": { "list": [{ "user_id": "13045", "order_no": "658900b7144ee7b4f419cb8054361045", "order_id": "13061", "web_name": "daffa", "web_url": "http://ewa.com", "description": "fdafdae", "order_stauts": 1, "status": 1, "price": "241.00", "paid_time": null, "updated_time": 1534471005, "created_time": 1534471005 }, { "user_id": "13045", "order_no": "c78b93d4d09ef6235e9d494b3534420e", "order_id": "13060", "web_name": "百度糯米", "web_url": "http://nuomi.baidu.com", "description": "测试123", "order_stauts": 1, "status": 1, "price": "20000.00", "paid_time": null, "updated_time": 1534470953, "created_time": 1534470953 }, { "user_id": "13045", "order_no": "88250d62de314beb6755c137ec4e4933", "order_id": "13059", "web_name": "两情若是久长时", "web_url": "http://qixi.com", "description": "唯一学不会的，就是放开你的手。让我想到了---喜欢是乍见之欢，爱是久处不厌。", "order_stauts": 1, "status": 1, "price": "3000.00", "paid_time": null, "updated_time": 1534404394, "created_time": 1534404394 }, { "user_id": "13045", "order_no": "902daf6855267276c83a639cbb25165c", "order_id": "13058", "web_name": "京东", "web_url": "http://jd.com", "description": "京东GOGOOGO", "order_stauts": 1, "status": 1, "price": "2411.00", "paid_time": null, "updated_time": 1534327229, "created_time": 1534327229 }, { "user_id": "13045", "order_no": "265e5f95d04550eb5b53ab39f4860336", "order_id": "13057", "web_name": "d", "web_url": "d", "description": "dfa", "order_stauts": 1, "status": 1, "price": "132.00", "paid_time": null, "updated_time": 1534303696, "created_time": 1534303696 }, { "user_id": "13045", "order_no": "530e685ac1c17f4c13ba184841f66796", "order_id": "13056", "web_name": "test3", "web_url": "http://test3com", "description": "test333", "order_stauts": 1, "status": 1, "price": "3000.00", "paid_time": null, "updated_time": 1534303383, "created_time": 1534303383 }, { "user_id": "13045", "order_no": "a995b410d5e76ed56523533b47e3786a", "order_id": "13055", "web_name": "fda", "web_url": "ddfa", "description": "d", "order_stauts": 1, "status": 1, "price": "1.00", "paid_time": null, "updated_time": 1534301580, "created_time": 1534301580 }, { "user_id": "13045", "order_no": "63c0d1be32c9c7e2dee3ac21690e490c", "order_id": "13054", "web_name": "test1", "web_url": "http://test1.com", "description": "teset11", "order_stauts": 1, "status": 1, "price": "1390.00", "paid_time": null, "updated_time": 1534299269, "created_time": 1534299269 }, { "user_id": "13045", "order_no": "6e212075e04d1616b06a5e1398e10053", "order_id": "13053", "web_name": "test", "web_url": "http://test.com", "description": "test11", "order_stauts": 1, "status": 1, "price": "20000.00", "paid_time": null, "updated_time": 1534298759, "created_time": 1534298759 }, { "user_id": "13045", "order_no": "096ce33c96792e289516407eb29b62bb", "order_id": "13052", "web_name": "test", "web_url": "http://test.com", "description": "test11", "order_stauts": 1, "status": 1, "price": "20000.00", "paid_time": null, "updated_time": 1534298709, "created_time": 1534298709 }, { "user_id": "13045", "order_no": "b594f8f8fcc3cc7910e2dcd4269a2e95", "order_id": "13051", "web_name": "DSP投放", "web_url": "http://e.yesdat.com", "description": "DSP test", "order_stauts": 1, "status": 1, "price": "10000.00", "paid_time": null, "updated_time": 1534298324, "created_time": 1534298324 }, { "user_id": "13045", "order_no": "9b1cab1b93285ce58e7c1dc576ff8a14", "order_id": "13050", "web_name": "唯品会", "web_url": "https://vip.com", "description": "唯品会vip", "order_stauts": 1, "status": 1, "price": "1232.00", "paid_time": null, "updated_time": 1534298187, "created_time": 1534298187 }, { "user_id": "13045", "order_no": "81bd84c896e453d8b6292072257c75c1", "order_id": "13049", "web_name": "淘宝", "web_url": "http://taobao.com", "description": "Taobao test", "order_stauts": 1, "status": 1, "price": "210.00", "paid_time": null, "updated_time": 1534298084, "created_time": 1534298084 }, { "user_id": "13045", "order_no": "2053ea869f5c78d1a98b73ae63133ea1", "order_id": "13048", "web_name": "百度", "web_url": "http://baidu.com", "description": "百度", "order_stauts": 1, "status": 1, "price": "1001.00", "paid_time": null, "updated_time": 1534251464, "created_time": 1534251464 }, { "user_id": "13045", "order_no": "e1c599867ee5449a59e6c638200a3d92", "order_id": "13047", "web_name": "赢时通网络", "web_url": "http://www.yesdat.com", "description": "测试123", "order_stauts": 1, "status": 1, "price": "1000.00", "paid_time": null, "updated_time": 1534251131, "created_time": 1534251131 }, { "user_id": "13045", "order_no": "ecd07f4483c92ba37b7aa92dd57d5f89", "order_id": "13046", "web_name": "test", "web_url": "http://baidu.com", "description": "test", "order_stauts": 1, "status": 1, "price": "100.00", "paid_time": null, "updated_time": 1534247003, "created_time": 1534247003 }], "pagination": { "current_page": 0, "page_size": 20, "total_count": 16 } } })

