//wsServer.js
var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {//此为对从客户端接受到的字母进行大写转换
        console.log("Received "+str)
        var obj = {serverId:[100001,100002]}
        var objToStr = JSON.stringify(obj)
        conn.sendText(objToStr)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8001)
