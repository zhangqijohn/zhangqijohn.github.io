var express = require('express');
var path = require('path'); //系统路径模块
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static(__dirname));
// app.use('/public', express.static('public'));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedParser);


// app.get('/index.html',function(req,res){
//     res.sendfile(__dirname+"/public/index.html");
// });

app.get('/api/getData', function (req, res) {
    var filePath = 'public/result.js'
    var file = path.join(__dirname, filePath); //文件路径，__dirname为当前运行js文件的目录
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            res.send({code: 2, body: err});
        } else {
            res.send({code: 1, body: data})
        }
    });
});

app.post('/api/postData', function (req, res) {
    var writeStr = `${req.body['result']}`;
    fs.writeFile(__dirname + '/public/result.js', writeStr, function (err) {
        if (err) {
            res.send({code: 2, body: err});
            console.error(err);
            res.end()
            return;
        }
    });
    res.send({code: 1, body: '修改成功'});
    res.end()
});


app.listen(8888, function () {
    console.log('已启动监听,http://zq.dev.q1op.com/');
});

