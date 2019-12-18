1.安装依赖项
~~~
    npm install
~~~

2.运行项目
~~~
    node index.js
~~~

3.打开谷歌浏览器，输入地址：
[http://localhost:8888/src/sign.html](http://localhost:8888/src/sign.html)

4.目录结构
~~~
 + public
    - result.js // 存放中奖结果，没点一次结束保存一次
 + src
    - css
    - img
    - js
    - lottery.html // 抽奖页面
    - sign.html // 用户进入展示页面
 - index.js // node 服务文件
~~~

5.**注意 使用node，不可关闭CMD命令窗口** ，关闭窗口后数据连接中断；
建议使用PM2长期开启8888端口，不再受CMD窗口关闭影响；
~~~
npm install pm2 -g
~~~

6.PM2 常用命令
~~~
 pm2 start index.js // 开启服务
 pm2 reload index.js // 重启服务
 pm2 stop index.js // 关闭服务
~~~
