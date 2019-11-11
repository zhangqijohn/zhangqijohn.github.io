import Mock from 'mockjs';

Mock.mock('/api/news', {
    body: {
        'list|1-10': ['@word'],
        'title': '@cname'
    },
    message: 'ok',
    statusCode: '200'
})