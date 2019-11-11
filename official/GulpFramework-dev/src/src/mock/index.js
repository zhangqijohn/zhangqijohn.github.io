/**
 * 模拟ajax请求后端API接口配置
 *
 */
var newsListData = Mock.mock('/api/news/', {
    "body|1-20": [
        {
            "title": "@title",
            "url": "@url",
            "date": "@date"
        }
    ],
    "msg": "获取成功",
    "statusCode": "200"
})