var newsListData = {
    list: [
        {
            title: '新闻列表测试1',
            date: '2019-03-25',
            url: '#'
        },
        {
            title: '新闻列表测试2',
            date: '2019-03-25',
            url: '#'
        },
        {
            title: '新闻列表测试3',
            date: '2019-03-25',
            url: '#'
        },
        {
            title: '新闻列表测试4',
            date: '2019-03-25',
            url: '#'
        }
    ]
};
news().render('newsListTemp', newsListData);
banner().run();
footer().run();
console.log("      _                      \n" +
    "  __ _/ |  ___ ___  _ __ ___  \n" +
    " / _` | | / __/ _ \\| '_ ` _ \\ \n" +
    "| (_| | || (_| (_) | | | | | |\n" +
    " \\__, |_(_)___\\___/|_| |_| |_|\n" +
    "    |_| ");

console.log('Your Application is Running in GulpFramework');