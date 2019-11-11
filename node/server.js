// http（HTTP）
//
// http.Agent 类
//
// new Agent([options])
// agent.createConnection(options[, callback])
// agent.keepSocketAlive(socket)
// agent.reuseSocket(socket, request)
// agent.destroy()
// agent.freeSockets
// agent.getName(options)
// agent.maxFreeSockets
// agent.maxSockets
// agent.requests
// agent.sockets
// http.ClientRequest 类
//
// 'abort' 事件
// 'connect' 事件
// 'continue' 事件
// 'information' 事件
// 'response' 事件
// 'socket' 事件
// 'timeout' 事件
// 'upgrade' 事件
// request.abort()
// request.aborted
// request.connection
// request.end([data[, encoding]][, callback])
// request.finished
// request.flushHeaders()
// request.getHeader(name)
// request.maxHeadersCount
// request.path
// request.removeHeader(name)
// request.setHeader(name, value)
// request.setNoDelay([noDelay])
// request.setSocketKeepAlive([enable][, initialDelay])
// request.setTimeout(timeout[, callback])
// request.socket
// request.writableEnded
// request.writableFinished
// request.write(chunk[, encoding][, callback])
// http.Server 类
//
// 'checkContinue' 事件
// 'checkExpectation' 事件
// 'clientError' 事件
// 'close' 事件
// 'connect' 事件
// 'connection' 事件
// 'request' 事件
// 'upgrade' 事件
// server.close([callback])
// server.headersTimeout
// server.listen()
// server.listening
// server.maxHeadersCount
// server.setTimeout([msecs][, callback])
// server.timeout
// server.keepAliveTimeout
// http.ServerResponse 类
//
// 'close' 事件
// 'finish' 事件
// response.addTrailers(headers)
// response.connection
// response.end([data][, encoding][, callback])
// response.finished
// response.flushHeaders()
// response.getHeader(name)
// response.getHeaderNames()
// response.getHeaders()
// response.hasHeader(name)
// response.headersSent
// response.removeHeader(name)
// response.sendDate
// response.setHeader(name, value)
// response.setTimeout(msecs[, callback])
// response.socket
// response.statusCode
// response.statusMessage
// response.writableEnded
// response.writableFinished
// response.write(chunk[, encoding][, callback])
// response.writeContinue()
// response.writeHead(statusCode[, statusMessage][, headers])
// response.writeProcessing()
// http.IncomingMessage 类
//
// 'aborted' 事件
// 'close' 事件
// message.aborted
// message.complete
// message.destroy([error])
// message.headers
// message.httpVersion
// message.method
// message.rawHeaders
// message.rawTrailers
// message.setTimeout(msecs, callback)
// message.socket
// message.statusCode
// message.statusMessage
// message.trailers
// message.url
// http.METHODS
// http.STATUS_CODES
// http.createServer([options][, requestListener])
// http.get(options[, callback])
// http.get(url[, options][, callback])
// http.globalAgent
// http.maxHeaderSize
// http.request(options[, callback])
// http.request(url[, options][, callback])


var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    response.write("node 已运行")
    handleWrite(response, "Hello World")
    console.log("我在服务器里")
    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');

function handleWrite(response, name) {
    response.write(name);
}



