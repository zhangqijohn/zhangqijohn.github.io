var data = {
    list: [
        {
            'title': '测试新闻标题1',
            'content': '测试新闻内容1',
            'date': new Date(),
            'link': 'http://www.q1.com'
        },
        {
            'title': '测试新闻标题2',
            'content': '测试新闻内容1',
            'date': new Date(),
            'link': 'http://www.q1.com'
        },
        {
            'title': '测试新闻标题3',
            'content': '测试新闻内容1',
            'date': new Date(),
            'link': 'http://www.q1.com'
        }
    ]
}

var html = template('newsList', data)
var $news = $('.mod-news')
var curIndex = data.list.length + 1
$news.html(html)

function getNewsData() {
    var i = 0;
    var size = 3;
    if(curIndex >= 10) {
        $('.mod-pager').html('没有数据了.')
        return
    }
    for(; i < size; i++) {
        data.list.push({
            'title': '测试新闻标题' + curIndex,
            'content': '测试新闻内容' + curIndex,
            'date': new Date(),
            'link': 'http://www.q1.com'
        })
        curIndex++
    }
    html = template('newsList', data)
    $news.html(html)
}

module.exports = {
    render: getNewsData
}