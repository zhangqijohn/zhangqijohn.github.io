# PM2 命令

启动监视： pm2 start app.js --watch -i 2
重启：pm2 restart app.js
停止：pm2 stop app_name|app_id
    停止特定的应用。可以先通过pm2 list获取应用的名字（--name指定的）或者进程id。
    如果要停止所有应用，可以 ：pm2 stop all
查看进程状态 : pm2 list


--watch：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
-i --instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。
--ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts""
-n --name：应用的名称。查看应用信息的时候可以用到。
-o --output <path>：标准输出日志文件的路径。
-e --error <path>：错误输出日志文件的路径。
--interpreter <interpreter>：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用。

