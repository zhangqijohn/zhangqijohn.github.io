import request from '@/util/request'
import qs from 'qs'

//获取新闻
export function getNews(params) {
    return request({
        url: '/api/news',
        method: 'get',
        data: params,
        headers: {
            "Content-Type": "application/json"
        }
    })
}